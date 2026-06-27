"""Confidence engine to compute field-level extraction confidences deterministically."""

import re
from decimal import Decimal
from typing import Any

from sqlalchemy.ext.asyncio import AsyncSession
from rapidfuzz import fuzz

from app.repositories.misc_repository import ClientRepository, VendorProfileRepository

class ConfidenceEngineService:
    def __init__(self, session: AsyncSession):
        self.session = session
        self.client_repo = ClientRepository(session)
        self.vendor_repo = VendorProfileRepository(session)

    async def calculate_confidence(
        self, normalized_data: dict[str, Any], raw_text: str, email_domain: str = ""
    ) -> dict[str, Any]:
        """
        Calculate independent confidence scores for fields without using generic random values.
        Returns a dict of field_name -> confidence_score (0-100).
        """
        confidences = {}
        
        # Vendor / Company Match
        company = normalized_data.get("company")
        if company:
            confidences["company"] = await self._score_vendor(company, raw_text, email_domain)
        
        # Amount Validation (Subtotal + Tax = Total)
        subtotal = self._to_decimal(normalized_data.get("subtotal"))
        tax = self._to_decimal(normalized_data.get("tax"))
        total = self._to_decimal(normalized_data.get("total"))
        amount_conf, tax_conf = self._score_amounts(subtotal, tax, total, raw_text)
        if total is not None:
            confidences["total"] = amount_conf
        if subtotal is not None:
            confidences["subtotal"] = amount_conf
        if tax is not None:
            confidences["tax"] = tax_conf

        # Date Validation
        date_str = normalized_data.get("date")
        if date_str:
            confidences["date"] = self._score_date(date_str, raw_text)

        # Invoice Number (Usually regex / format match)
        invoice_number = normalized_data.get("invoice_number") or normalized_data.get("project") # project acts as invoice number sometimes in this schema
        if invoice_number:
            confidences["project"] = self._score_invoice_number(str(invoice_number), raw_text)
            
        # Currency Detection
        currency = normalized_data.get("currency")
        if currency:
            confidences["currency"] = 100.0 if currency in raw_text else 50.0

        return confidences

    async def _score_vendor(self, vendor_name: str, raw_text: str, email_domain: str) -> float:
        score = 40.0
        
        if vendor_name.lower() in raw_text.lower():
            score += 20.0
            
        # Existing client database match
        clients = await self.client_repo.list_all()
        best_match = 0
        for client in clients:
            ratio = fuzz.partial_ratio(vendor_name.lower(), client.name.lower())
            best_match = max(best_match, ratio)
            
        if best_match >= 90:
            score += 30.0
        elif best_match >= 75:
            score += 15.0
            
        # Email sender domain match
        if email_domain:
            domain_core = email_domain.split(".")[0].lower()
            if domain_core in vendor_name.lower():
                score += 10.0
                
        return min(100.0, score)

    def _score_amounts(self, subtotal: Decimal | None, tax: Decimal | None, total: Decimal | None, raw_text: str) -> tuple[float, float]:
        amount_score = 50.0
        tax_score = 50.0
        
        # Mathematical Validation
        if total is not None:
            if str(total) in raw_text:
                amount_score += 20.0
            
            if subtotal is not None:
                if str(subtotal) in raw_text:
                    amount_score += 10.0
                tax_val = tax or Decimal("0")
                if subtotal + tax_val == total:
                    amount_score += 20.0
                    tax_score += 40.0
                else:
                    amount_score -= 30.0
                    tax_score -= 30.0
                    
        return min(100.0, max(0.0, amount_score)), min(100.0, max(0.0, tax_score))

    def _score_date(self, date_str: str, raw_text: str) -> float:
        score = 40.0
        if date_str in raw_text:
            score += 30.0
            
        # Check standard date formats
        if re.match(r"^\d{4}-\d{2}-\d{2}$", date_str) or re.match(r"^\d{2}/\d{2}/\d{4}$", date_str):
            score += 30.0
            
        return min(100.0, score)

    def _score_invoice_number(self, invoice_number: str, raw_text: str) -> float:
        score = 50.0
        if invoice_number in raw_text:
            score += 30.0
            
        # Check alphanumeric structure (common for invoices)
        if re.match(r"^[A-Z0-9\-\#]+$", invoice_number):
            score += 20.0
            
        return min(100.0, score)
        
    @staticmethod
    def _to_decimal(value) -> Decimal | None:
        if value is None:
            return None
        try:
            return Decimal(str(value))
        except Exception:
            return None
