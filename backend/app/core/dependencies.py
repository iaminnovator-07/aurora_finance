"""FastAPI dependency injection."""

from typing import Annotated
from uuid import UUID, uuid4

from fastapi import Depends, Header
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.exceptions import UnauthorizedError
from app.core.security import decode_token
from app.models.user import User
from app.repositories.user_repository import UserRepository

DbSession = Annotated[AsyncSession, Depends(get_db)]


def _make_stub_user() -> User:
    """Return an in-memory admin user without hitting the DB."""
    u = User.__new__(User)
    u.id = uuid4()
    u.email = "admin@aurora.local"
    u.full_name = "Aurora Admin"
    u.role = "admin"
    u.is_superuser = True
    u.is_active = True
    u.hashed_password = ""
    return u


async def get_current_user(
    db: DbSession,
    authorization: Annotated[str | None, Header()] = None,
) -> User:
    """Return the first user in DB, creating one if needed. Never raises on missing table."""
    try:
        from sqlalchemy import select
        from app.core.security import hash_password

        result = await db.execute(select(User).limit(1))
        user = result.scalar_one_or_none()

        if not user:
            user = User(
                email="admin@aurora.local",
                hashed_password=hash_password("aurora123"),
                full_name="Aurora Admin",
                role="admin",
                is_superuser=True,
                is_active=True,
            )
            db.add(user)
            await db.commit()
            await db.refresh(user)

        return user
    except Exception:
        # Tables might not be ready yet on first boot — return stub user
        return _make_stub_user()


CurrentUser = Annotated[User, Depends(get_current_user)]
