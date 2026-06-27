"""Vendor intelligence for building vendor profiles and computing reputation."""

import re
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from rapidfuzz import fuzz

from app.models.invoice import Invoice
from app.models.base import InvoiceStatus
from app.models.misc import VendorProfile
from app.repositories.misc_repository import VendorProfileRepository, ClientRepository

class VendorService:
    def __init__(self, session: AsyncSession):
        self.session = session
        self.vendor_repo = VendorProfileRepository(session)
        self.client_repo = ClientRepository(session)

    async def update_vendor_profile(self, invoice: Invoice) -> None:
        """Update or create a vendor profile when an invoice is processed."""
        if not invoice.vendor_name:
            return

        vendor_name = invoice.vendor_name
        email_domain = invoice.vendor_email.split("@")[-1] if invoice.vendor_email and "@" in invoice.vendor_email else ""
        
        # Fuzzy match to find existing vendor if we don't have exact match
        existing_profile = await self.vendor_repo.get_by_client_id(invoice.client_id) if invoice.client_id else None
        
        if not existing_profile:
            profiles = await self.vendor_repo.list_all()
            best_match = None
            best_score = 0
            for profile in profiles:
                # Compare by vendor_name (stored in profile string or we can just use client linkage)
                # For this MVP, we assume client_id links the vendor profile to the main client db
                client = await self.client_repo.get_by_id(profile.client_id) if profile.client_id else None
                client_name = client.name if client else ""
                score = fuzz.ratio(vendor_name.lower(), client_name.lower())
                if score > best_score:
                    best_score = score
                    best_match = profile
                    
            if best_score > 85:
                existing_profile = best_match

        if not existing_profile:
            # We don't have a direct way to create a client here, but let's assume we link it if found
            # or just create a standalone VendorProfile if model allows it (it requires client_id).
            # For hackathon, if no client_id, we can't create VendorProfile since client_id is ForeignKey.
            if not invoice.client_id:
                return # Can't create profile without client_id
                
            existing_profile = VendorProfile(
                client_id=invoice.client_id,
                total_invoices=0,
                total_spend=0.0,
                reputation_score=75.0, # base score
                fraud_incidents=0,
                is_verified=False
            )
            existing_profile = await self.vendor_repo.create(existing_profile)

        # Update stats
        existing_profile.total_invoices += 1
        existing_profile.total_spend += float(invoice.total_amount or 0)
        
        if invoice.status == InvoiceStatus.REJECTED.value:
            existing_profile.reputation_score = max(0.0, existing_profile.reputation_score - 10)
        elif invoice.status in [InvoiceStatus.AUTO_APPROVED.value, InvoiceStatus.APPROVED.value]:
            existing_profile.reputation_score = min(100.0, existing_profile.reputation_score + 2)

        await self.vendor_repo.update(existing_profile)
