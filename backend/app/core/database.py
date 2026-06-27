"""Async SQLAlchemy database session management.

When the application is configured to use Firestore as the primary
`DATABASE_BACKEND`, SQLAlchemy should not be initialised. This module
now avoids creating an engine when Postgres is not configured and
provides a clear runtime error if `get_db()` is invoked incorrectly.
"""

from collections.abc import AsyncGenerator
from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.config import get_settings

settings = get_settings()

_engine_kwargs: dict = {"echo": settings.debug, "pool_pre_ping": True}
if settings.database_url and settings.database_url.startswith("postgresql"):
    _engine_kwargs.update(pool_size=10, max_overflow=20)

# Only create a SQLAlchemy engine when Postgres is the chosen backend.
if settings.database_backend == "postgresql" and settings.database_url:
    engine = create_async_engine(settings.database_url, **_engine_kwargs)

    AsyncSessionLocal = async_sessionmaker(
        engine,
        class_=AsyncSession,
        expire_on_commit=False,
        autocommit=False,
        autoflush=False,
    )
else:
    engine = None
    AsyncSessionLocal = None


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Yield a database session when Postgres is configured.

    Raises a RuntimeError if the app is running in Firestore mode and
    a SQLAlchemy session is requested.
    """
    if AsyncSessionLocal is None:
        raise RuntimeError(
            "PostgreSQL is not configured (DATABASE_BACKEND != 'postgresql')."
        )

    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
