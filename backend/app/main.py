"""FastAPI application entry point."""


import logging
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import get_settings
from app.core.exceptions import AuroraException
from app.middleware.logging import RequestLoggingMiddleware
from app.routes.api import router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger("aurora")


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    logger.info("═══════════════════════════════════════════════════════")
    logger.info(
        "  Aurora TIA v%s [%s] starting up...",
        settings.app_version,
        settings.environment,
    )
    logger.info(
        "  Gmail account: %s", settings.gmail_user_email or "NOT CONFIGURED"
    )
    logger.info(
        "  Database: %s",
        settings.database_url[:40] + "..." if len(settings.database_url) > 40 else settings.database_url,
    )

    # ── 1. Create all tables ───────────────────────────────────────────────────
    try:
        from app.core.database import engine, Base
        # Import every model so SQLAlchemy knows about all tables
        import app.models  # noqa: F401

        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("✓ Database tables verified / created")
    except Exception as exc:
        logger.error("✗ Failed to create database tables: %s", exc)

    # ── 2. Seed default admin user if users table is empty ────────────────────
    try:
        from sqlalchemy import select
        from app.core.database import AsyncSessionLocal
        from app.core.security import hash_password
        from app.models.user import User

        async with AsyncSessionLocal() as session:
            result = await session.execute(select(User).limit(1))
            if result.scalar_one_or_none() is None:
                admin = User(
                    email="admin@aurora.local",
                    hashed_password=hash_password("aurora123"),
                    full_name="Aurora Admin",
                    role="admin",
                    is_superuser=True,
                    is_active=True,
                )
                session.add(admin)
                await session.commit()
                logger.info("✓ Default admin user seeded (admin@aurora.local / aurora123)")
            else:
                logger.info("✓ Admin user already exists")
    except Exception as exc:
        logger.error("✗ Failed to seed admin user: %s", exc)

    # ── 3. Seed required business rules if missing ────────────────────────────
    try:
        from sqlalchemy import select
        from app.core.database import AsyncSessionLocal
        from app.models.approval import BusinessRule

        RULES = [
            {"name": "Auto-approve under $1,000", "condition_expression": "amount < 1000 AND vendor.trust > 85", "action": "approve + push ERP", "category": "auto_approval", "is_active": True},
            {"name": "Flag duplicate within 30d", "condition_expression": "similar(invoice) > 0.95", "action": "queue: needs_review", "category": "duplicate", "is_active": True},
            {"name": "Reject unknown domain + urgent keywords", "condition_expression": "vendor.unknown AND subject matches /urgent|wire/i", "action": "reject + alert security", "category": "fraud", "is_active": True},
            {"name": "Multi-level approval > $10k", "condition_expression": "amount > 10000", "action": "request approval: manager → CFO", "category": "approval", "is_active": True},
        ]

        async with AsyncSessionLocal() as session:
            result = await session.execute(select(BusinessRule).limit(1))
            if result.scalar_one_or_none() is None:
                for rule in RULES:
                    session.add(BusinessRule(**rule))
                await session.commit()
                logger.info("✓ Default business rules seeded")
    except Exception as exc:
        logger.error("✗ Failed to seed business rules: %s", exc)

    # ── 4. Gmail token status ─────────────────────────────────────────────────
    token_path = Path(settings.gmail_token_path)
    if token_path.exists():
        logger.info("✓ Gmail token found at %s", token_path)
    else:
        logger.warning("⚠ Gmail token NOT found at %s", token_path.resolve())
        logger.warning("  → Run: python scripts/auth_gmail.py")

    logger.info("✓ Aurora TIA backend ready")
    logger.info("═══════════════════════════════════════════════════════")

    yield
    logger.info("Shutting down %s", settings.app_name)


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        description="Aurora TIA — Touchless Invoice Agent API",
        lifespan=lifespan,
        docs_url="/docs",
        redoc_url="/redoc",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_middleware(RequestLoggingMiddleware)

    @app.exception_handler(AuroraException)
    async def aurora_exception_handler(request: Request, exc: AuroraException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "code": exc.code,
                "message": exc.message,
                "reason": exc.reason,
                "details": exc.details,
            },
        )

    @app.exception_handler(Exception)
    async def generic_exception_handler(request: Request, exc: Exception):
        logger.exception("Unhandled exception: %s", exc)
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "code": "INTERNAL_ERROR",
                "message": "An internal error occurred",
                "reason": str(exc) if settings.debug else "Contact support",
            },
        )

    app.include_router(router)
    return app


app = create_app()
