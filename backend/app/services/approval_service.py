"""Approval queue management service."""

from datetime import UTC, datetime
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundError, ValidationError
from app.models.approval import ApprovalQueue
from app.models.base import ApprovalQueueStatus, ApprovalStatus, InvoiceStatus, NotificationType
from app.repositories.invoice_repository import InvoiceRepository
from app.repositories.misc_repository import ApprovalQueueRepository
from app.services.audit_service import AuditService
from app.services.notification_service import NotificationService


class ApprovalService:
    def __init__(self, session: AsyncSession):
        self.session = session
        self.approval_repo = ApprovalQueueRepository(session)
        self.invoice_repo = InvoiceRepository(session)
        self.audit = AuditService(session)
        self.notifications = NotificationService(session)

    async def list_queue(self, status: str | None = None) -> list[ApprovalQueue]:
        return await self.approval_repo.list_by_status(status)

    async def approve(
        self,
        queue_id: UUID,
        reviewer_id: UUID,
        notes: str | None = None,
    ) -> ApprovalQueue:
        entry = await self.approval_repo.get_by_id(queue_id)
        if not entry:
            raise NotFoundError("ApprovalQueue", str(queue_id))

        invoice = await self.invoice_repo.get_by_id(entry.invoice_id)
        if not invoice:
            raise NotFoundError("Invoice", str(entry.invoice_id))

        entry.approval_status = ApprovalStatus.APPROVED.value
        entry.status = ApprovalQueueStatus.RESOLVED.value
        entry.reviewed_by_id = reviewer_id
        entry.reviewed_at = datetime.now(UTC)
        entry.review_notes = notes
        await self.approval_repo.update(entry)

        invoice.status = InvoiceStatus.APPROVED.value
        invoice.approved_by_id = reviewer_id
        invoice.approved_at = datetime.now(UTC)
        await self.invoice_repo.update(invoice)

        await self.audit.log_action(
            user_id=reviewer_id,
            action="approve",
            module="approval",
            entity_type="invoice",
            entity_id=str(invoice.id),
            new_value={"status": invoice.status},
            details=notes,
            confidence=entry.confidence_score,
        )
        await self.notifications.create_notification(
            type=NotificationType.INVOICE_APPROVED.value,
            title=f"Invoice {invoice.invoice_number} approved",
            message=notes or "Invoice approved by reviewer",
            entity_type="invoice",
            entity_id=str(invoice.id),
        )
        return entry

    async def approve_response(
        self, queue_id: UUID, reviewer_id: UUID, notes: str | None = None
    ) -> dict:
        entry = await self.approve(queue_id, reviewer_id, notes)
        return {
            "approval_id": entry.id,
            "invoice_id": entry.invoice_id,
            "status": entry.approval_status,
            "message": "Invoice approved",
            "next_stage": "erp_export",
        }

    async def reject_response(
        self, queue_id: UUID, reviewer_id: UUID, notes: str | None = None
    ) -> dict:
        entry = await self.reject(queue_id, reviewer_id, notes or "Rejected by reviewer")
        return {
            "approval_id": entry.id,
            "invoice_id": entry.invoice_id,
            "status": entry.approval_status,
            "message": "Invoice rejected",
            "next_stage": None,
        }

    async def request_review_response(
        self, queue_id: UUID, reviewer_id: UUID, notes: str | None = None
    ) -> dict:
        entry = await self.approval_repo.get_by_id(queue_id)
        if not entry:
            raise NotFoundError("ApprovalQueue", str(queue_id))
        entry.approval_status = ApprovalStatus.REQUEST_REVIEW.value
        entry.review_notes = notes
        entry.reviewed_by_id = reviewer_id
        entry.reviewed_at = datetime.now(UTC)
        await self.approval_repo.update(entry)
        return {
            "approval_id": entry.id,
            "invoice_id": entry.invoice_id,
            "status": entry.approval_status,
            "message": "Additional review requested",
            "next_stage": "waiting_approval",
        }

    async def list_queue_dicts(self, status: str | None = None) -> list[dict]:
        from app.models.email import Email
        from sqlalchemy.orm import selectinload
        items = await self.list_queue(status)
        result = []
        for item in items:
            invoice = await self.invoice_repo.get_by_id(item.invoice_id)
            attachment_id = None
            if invoice and invoice.email_id:
                # Need to get email with attachments
                from sqlalchemy import select
                stmt = select(Email).options(selectinload(Email.attachments)).where(Email.id == invoice.email_id)
                email_res = await self.session.execute(stmt)
                email = email_res.scalar_one_or_none()
                if email and email.attachments:
                    attachment_id = str(email.attachments[0].id)
                    
            # Generate simulated bounding boxes with error highlights based on failed rules
            bounding_boxes = [
                {"id": "vendor", "label": "Vendor", "color": "#3b82f6", "top": 10, "left": 10, "width": 30, "height": 5},
                {"id": "invoice_number", "label": "Invoice #", "color": "#22c55e", "top": 15, "left": 70, "width": 20, "height": 4},
                {"id": "amount", "label": "Amount", "color": "#f97316", "top": 85, "left": 70, "width": 20, "height": 5},
                {"id": "tax", "label": "Tax", "color": "#a855f7", "top": 80, "left": 70, "width": 20, "height": 4},
                {"id": "gst", "label": "GST", "color": "#0ea5e9", "top": 20, "left": 10, "width": 25, "height": 4},
                {"id": "po", "label": "PO Number", "color": "#ec4899", "top": 20, "left": 70, "width": 20, "height": 4},
            ]
            
            failed_rules_list = item.failed_rules or []
            failed_names = [r.get("rule_name", "").lower() for r in failed_rules_list]
            
            error_mapping = {
                "amount calculation": "amount",
                "tax calculation": "tax",
                "duplicate check": "invoice_number",
                "missing required fields": "gst", # simplified mapping
            }
            
            for box in bounding_boxes:
                # Flag boxes with errors
                for rule in failed_rules_list:
                    r_name = rule.get("rule_name", "").lower()
                    mapped_id = error_mapping.get(r_name)
                    if mapped_id == box["id"] or (r_name == "missing required fields" and ("gst" in rule.get("reason", "").lower() and box["id"] == "gst")):
                        box["color"] = "#ef4444" # Red for error
                        box["isActive"] = True
                        box["error_details"] = {
                            "severity": rule.get("severity", "high"),
                            "root_cause": rule.get("reason", "Validation failed"),
                            "suggested_fix": f"Review {box['label']} in document",
                            "business_impact": "Compliance risk"
                        }
                    
            result.append({
                "id": item.id,
                "invoice_id": item.invoice_id,
                "invoice_number": invoice.invoice_number if invoice else None,
                "attachment_id": attachment_id,
                "status": item.status,
                "approval_status": item.approval_status,
                "reason": item.reason,
                "risk_level": item.risk_level,
                "ai_recommendation": item.ai_recommendation,
                "ai_suggestion": item.ai_suggestion,
                "confidence_score": item.confidence_score,
                "trust_score": item.trust_score,
                "failed_rules": item.failed_rules,
                "bounding_boxes": bounding_boxes,
                "assignee_name": None,
                "created_at": item.created_at,
            })
        return result

    async def reject(
        self,
        queue_id: UUID,
        reviewer_id: UUID,
        reason: str,
    ) -> ApprovalQueue:
        if not reason.strip():
            raise ValidationError("Rejection reason is required")

        entry = await self.approval_repo.get_by_id(queue_id)
        if not entry:
            raise NotFoundError("ApprovalQueue", str(queue_id))

        invoice = await self.invoice_repo.get_by_id(entry.invoice_id)
        if not invoice:
            raise NotFoundError("Invoice", str(entry.invoice_id))

        entry.approval_status = ApprovalStatus.REJECTED.value
        entry.status = ApprovalQueueStatus.REJECTED.value
        entry.reviewed_by_id = reviewer_id
        entry.reviewed_at = datetime.now(UTC)
        entry.review_notes = reason
        await self.approval_repo.update(entry)

        invoice.status = InvoiceStatus.REJECTED.value
        invoice.rejected_reason = reason
        await self.invoice_repo.update(invoice)

        await self.audit.log_action(
            user_id=reviewer_id,
            action="reject",
            module="approval",
            entity_type="invoice",
            entity_id=str(invoice.id),
            details=reason,
            confidence=entry.confidence_score,
        )
        await self.notifications.create_notification(
            type=NotificationType.INVOICE_REJECTED.value,
            title=f"Invoice {invoice.invoice_number} rejected",
            message=reason,
            entity_type="invoice",
            entity_id=str(invoice.id),
        )
        return entry

    async def request_review(
        self,
        invoice_id: UUID,
        reason: str,
        *,
        risk_level: str = "medium",
        failed_rules: list | None = None,
        confidence_score: float | None = None,
        trust_score: float | None = None,
        ai_suggestion: str | None = None,
        assignee_id: UUID | None = None,
        priority: int = 0,
    ) -> ApprovalQueue:
        invoice = await self.invoice_repo.get_by_id(invoice_id)
        if not invoice:
            raise NotFoundError("Invoice", str(invoice_id))

        existing = await self.approval_repo.get_by_invoice_id(invoice_id)
        if existing:
            existing.reason = reason
            existing.risk_level = risk_level
            existing.failed_rules = failed_rules
            existing.confidence_score = confidence_score
            existing.trust_score = trust_score
            existing.ai_suggestion = ai_suggestion
            existing.assignee_id = assignee_id
            existing.priority = priority
            existing.approval_status = ApprovalStatus.REQUEST_REVIEW.value
            entry = await self.approval_repo.update(existing)
        else:
            entry = ApprovalQueue(
                invoice_id=invoice_id,
                status=ApprovalQueueStatus.NEEDS_REVIEW.value,
                approval_status=ApprovalStatus.REQUEST_REVIEW.value,
                reason=reason,
                risk_level=risk_level,
                failed_rules=failed_rules,
                confidence_score=confidence_score,
                trust_score=trust_score,
                ai_suggestion=ai_suggestion,
                assignee_id=assignee_id,
                priority=priority,
            )
            entry = await self.approval_repo.create(entry)

        invoice.status = InvoiceStatus.IN_REVIEW.value
        await self.invoice_repo.update(invoice)

        await self.notifications.create_notification(
            type=NotificationType.APPROVAL_REQUIRED.value,
            title=f"Review required: {invoice.invoice_number}",
            message=reason,
            user_id=assignee_id,
            entity_type="invoice",
            entity_id=str(invoice_id),
        )
        return entry
