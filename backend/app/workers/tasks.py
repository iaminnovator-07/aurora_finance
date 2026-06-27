"""Synchronous pipeline helpers — replaces the old Celery task module.

All processing now runs synchronously inside the FastAPI request lifecycle.
No broker, no queues, no workers required.
"""

import logging
from uuid import UUID

logger = logging.getLogger(__name__)


async def process_email(email_id: str) -> dict:
    """Run the full pipeline for a single email synchronously."""
    from app.core.database import AsyncSessionLocal
    from app.services.pipeline_service import PipelineService

    async with AsyncSessionLocal() as session:
        try:
            service = PipelineService(session)
            result = await service.process_email(UUID(email_id))
            await session.commit()
            return result
        except Exception:
            await session.rollback()
            raise


async def process_all_pending() -> dict:
    """Process all emails with RECEIVED status synchronously."""
    from sqlalchemy import select
    from app.core.database import AsyncSessionLocal
    from app.models.base import EmailStatus
    from app.models.email import Email
    from app.services.pipeline_service import PipelineService

    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(Email).where(Email.status == EmailStatus.RECEIVED.value).limit(50)
        )
        emails = list(result.scalars().all())
        service = PipelineService(session)
        processed = []
        for email in emails:
            try:
                r = await service.process_email(email.id)
                processed.append({"email_id": str(email.id), "outcome": r.get("outcome")})
            except Exception as exc:
                logger.exception("Failed to process email %s", email.id)
                processed.append({"email_id": str(email.id), "error": str(exc)})
        await session.commit()
        return {"processed": len(processed), "results": processed}


async def sync_gmail() -> dict:
    """Sync Gmail inbox synchronously."""
    from app.core.database import AsyncSessionLocal
    from app.services.gmail_service import GmailService

    async with AsyncSessionLocal() as session:
        service = GmailService(session)
        result = await service.sync_emails()
        await session.commit()
        return result


async def analytics_snapshot() -> dict:
    """Save an analytics snapshot synchronously."""
    from app.core.database import AsyncSessionLocal
    from app.services.analytics_service import AnalyticsService

    async with AsyncSessionLocal() as session:
        service = AnalyticsService(session)
        snapshot = await service.save_snapshot()
        await session.commit()
        return {"snapshot_id": str(snapshot.id)}
