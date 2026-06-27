"""Async SQLAlchemy database session management.

Supports both SQLite (for hackathon/dev) and PostgreSQL (for production).
Detects the database type from the URL to apply appropriate settings.
"""

from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.config import get_settings

settings = get_settings()

_url = settings.database_url or ""
_is_sqlite = _url.startswith("sqlite")

# Build engine kwargs based on database type
_engine_kwargs: dict = {"echo": settings.debug, "pool_pre_ping": True}

if _is_sqlite:
    # SQLite async requires check_same_thread=False and no pool_size
    _engine_kwargs["connect_args"] = {"check_same_thread": False}
else:
    # PostgreSQL: connection pooling
    _engine_kwargs.update(pool_size=10, max_overflow=20)

# Create engine if we have a URL (SQLite OR PostgreSQL)
if _url:
    engine = create_async_engine(_url, **_engine_kwargs)

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
    """Yield a database session.

    Raises a RuntimeError if no DATABASE_URL is configured.
    """
    if AsyncSessionLocal is None:
        raise RuntimeError(
            "Database is not configured. Set DATABASE_URL in your .env file."
        )

    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
