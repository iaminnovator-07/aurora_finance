"""Gmail sync using OAuth token — reads real inbox from swadeepbansode2007@gmail.com."""

import base64
import json
import logging
from datetime import UTC, datetime
from pathlib import Path
from uuid import uuid4

from sqlalchemy.ext.asyncio import AsyncSession

from app.config import get_settings
from app.core.exceptions import ProcessingError
from app.models.base import EmailStatus
from app.models.email import Email, EmailAttachment
from app.repositories.email_repository import EmailRepository
from app.services.storage_service import StorageService

logger = logging.getLogger(__name__)

# Supported attachment MIME types for processing
SUPPORTED_MIME_TYPES = {
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "text/csv",
    "application/csv",
    "application/octet-stream",  # fallback — always try to process
}

SUPPORTED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg", ".docx", ".xlsx", ".xls", ".csv"}


class GmailService:

    def __init__(self, session: AsyncSession):
        self.session = session
        self.settings = get_settings()
        self.email_repo = EmailRepository(session)
        self.storage = StorageService(session)

    async def sync_emails(self, max_results: int = 20) -> dict:
        """Sync emails from Gmail inbox."""
        credentials = self._load_credentials()
        if credentials is None:
            raise ProcessingError(
                "Gmail OAuth credentials not configured.",
                reason="Token file not found or invalid."
            )

        try:
            return await self._sync_from_gmail_api(credentials, max_results)
        except ProcessingError:
            raise
        except Exception as exc:
            logger.error("Gmail API sync failed: %s", exc)
            raise ProcessingError(
                "Please authenticate Gmail again.",
                reason=str(exc),
            ) from exc

    def _load_credentials(self) -> dict | None:
        """Load and return token data from gmail_token.json, or None if not found/invalid."""
        token_path = Path(self.settings.gmail_token_path)
        if not token_path.exists():
            logger.warning("Gmail token not found at: %s", token_path.resolve())
            return None
        try:
            data = json.loads(token_path.read_text(encoding="utf-8"))
            logger.info("✓ Gmail token loaded from %s", token_path)
            return data
        except Exception as exc:
            logger.error("Could not load Gmail token: %s", exc)
            return None

    async def _sync_from_gmail_api(self, token_data: dict, max_results: int) -> dict:
        from google.auth.transport.requests import Request
        from google.oauth2.credentials import Credentials
        from googleapiclient.discovery import build

        # Load and refresh credentials if expired
        creds = Credentials.from_authorized_user_info(token_data)
        if creds.expired and creds.refresh_token:
            logger.info("Refreshing expired Gmail token...")
            creds.refresh(Request())
            Path(self.settings.gmail_token_path).write_text(
                creds.to_json(), encoding="utf-8"
            )
            logger.info("✓ Gmail token refreshed and saved")

        service = build("gmail", "v1", credentials=creds)
        user_id = self.settings.gmail_user_email or "me"

        logger.info("Fetching inbox for: %s", user_id)

        # Fetch only INBOX messages (not spam/trash)
        results = (
            service.users()
            .messages()
            .list(
                userId=user_id,
                maxResults=max_results,
                labelIds=["INBOX"],
            )
            .execute()
        )
        messages = results.get("messages", [])
        logger.info("Found %d messages in inbox", len(messages))

        synced = 0
        skipped = 0
        errors = 0

        for msg_ref in messages:
            msg_id = msg_ref["id"]

            # Skip already-synced emails
            existing = await self.email_repo.get_by_gmail_id(msg_id)
            if existing:
                skipped += 1
                continue

            try:
                msg = (
                    service.users()
                    .messages()
                    .get(userId=user_id, id=msg_id, format="full")
                    .execute()
                )
                email = await self._parse_gmail_message(msg)
                synced += 1
                logger.info("✓ Email synced: %s", email.subject[:60])

                # Download supported attachments
                await self._download_attachments(service, user_id, msg_id, msg, email)

            except Exception as exc:
                logger.error("Failed to sync message %s: %s", msg_id, exc)
                errors += 1
                continue

        await self.session.flush()

        logger.info(
            "✓ Gmail sync complete: %d new, %d skipped, %d errors",
            synced, skipped, errors
        )

        return {
            "source": "gmail_api",
            "account": user_id,
            "synced": synced,
            "skipped": skipped,
            "errors": errors,
            "confidence": 95.0,
        }

    async def _download_attachments(
        self, service, user_id: str, msg_id: str, msg: dict, email: Email
    ) -> None:
        """Download and store supported attachments from a Gmail message."""
        parts = msg.get("payload", {}).get("parts", [])
        # Also check nested parts (for multipart messages)
        all_parts = self._flatten_parts(parts)

        for part in all_parts:
            filename = part.get("filename", "")
            body = part.get("body", {})
            attachment_id = body.get("attachmentId")
            mime_type = part.get("mimeType", "application/octet-stream")

            if not filename or not attachment_id:
                continue

            # Check if file type is supported
            file_ext = Path(filename).suffix.lower()
            if not (
                mime_type in SUPPORTED_MIME_TYPES
                or file_ext in SUPPORTED_EXTENSIONS
            ):
                logger.debug("Skipping unsupported attachment: %s (%s)", filename, mime_type)
                continue

            try:
                att_data = (
                    service.users()
                    .messages()
                    .attachments()
                    .get(userId=user_id, messageId=msg_id, id=attachment_id)
                    .execute()
                )
                content = base64.urlsafe_b64decode(att_data["data"])
                storage_path = await self.storage.save_file(
                    content, filename, subdir="attachments"
                )
                attachment = EmailAttachment(
                    email_id=email.id,
                    filename=filename,
                    content_type=mime_type,
                    size_bytes=len(content),
                    storage_path=storage_path,
                    checksum=StorageService.compute_checksum(content),
                )
                self.session.add(attachment)
                logger.info("✓ Attachment saved: %s (%d bytes)", filename, len(content))
            except Exception as exc:
                logger.error("Failed to download attachment %s: %s", filename, exc)

    def _flatten_parts(self, parts: list) -> list:
        """Recursively flatten nested MIME parts."""
        result = []
        for part in parts:
            result.append(part)
            nested = part.get("parts", [])
            if nested:
                result.extend(self._flatten_parts(nested))
        return result

    async def _parse_gmail_message(self, msg: dict) -> Email:
        headers = {
            h["name"].lower(): h["value"]
            for h in msg.get("payload", {}).get("headers", [])
        }
        from_raw = headers.get("from", "")
        from_email = from_raw
        from_name = None
        if "<" in from_raw:
            from_name = from_raw.split("<")[0].strip().strip('"')
            from_email = from_raw.split("<")[1].strip(">").strip()

        body_text = self._extract_body(msg.get("payload", {}))
        internal_date = int(msg.get("internalDate", 0)) / 1000
        received_at = (
            datetime.fromtimestamp(internal_date, tz=UTC)
            if internal_date
            else datetime.now(UTC)
        )

        email = Email(
            gmail_message_id=msg["id"],
            thread_id=msg.get("threadId"),
            from_email=from_email or "unknown@gmail.com",
            from_name=from_name,
            to_email=headers.get(
                "to", self.settings.gmail_user_email or "inbox@aurora.local"
            ),
            subject=headers.get("subject", "(no subject)"),
            body_text=body_text,
            received_at=received_at,
            status=EmailStatus.RECEIVED.value,
            raw_headers=headers,
        )
        return await self.email_repo.create(email)

    def _extract_body(self, payload: dict) -> str:
        """Extract plain text body from Gmail message payload, handling nested parts."""
        # Direct body data
        if payload.get("body", {}).get("data"):
            try:
                return base64.urlsafe_b64decode(payload["body"]["data"]).decode(
                    "utf-8", errors="ignore"
                )
            except Exception:
                pass

        # Search parts for text/plain
        for part in payload.get("parts", []):
            mime = part.get("mimeType", "")
            if mime == "text/plain" and part.get("body", {}).get("data"):
                try:
                    return base64.urlsafe_b64decode(part["body"]["data"]).decode(
                        "utf-8", errors="ignore"
                    )
                except Exception:
                    continue
            # Recurse into multipart
            if mime.startswith("multipart/"):
                nested = self._extract_body(part)
                if nested:
                    return nested

        return ""
