"""FastAPI application entry point."""

import logging
from contextlib import asynccontextmanager

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
    logger.info("Starting %s v%s [%s]", settings.app_name, settings.app_version, settings.environment)

    # Hackathon Demo: Run sync and pipeline on startup (synchronous — no Celery needed)
    import asyncio

    async def startup_sync():
        from app.core.database import AsyncSessionLocal
        from app.controllers import InboxController
        from app.workers.tasks import process_all_pending

        async with AsyncSessionLocal() as db:
            try:
                logger.info("Starting auto-sync for Gmail on startup...")
                result = await InboxController(db).sync_emails()
                logger.info(f"Auto-sync completed: {result}")
            except Exception as e:
                logger.error(f"Gmail sync failed: {e}. Falling back to demo mode...")
                try:
                    from scripts.seed import seed
                    await seed()
                except Exception as seed_err:
                    logger.warning(f"Seed also failed: {seed_err}")

        # Process any pending emails synchronously
        try:
            logger.info("Running pipeline for pending emails...")
            outcome = await process_all_pending()
            logger.info(f"Startup pipeline complete: {outcome}")
        except Exception as e:
            logger.error(f"Startup pipeline failed: {e}")

    asyncio.create_task(startup_sync())

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
