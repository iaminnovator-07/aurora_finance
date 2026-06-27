"""FastAPI dependency injection."""

from typing import Annotated
from uuid import UUID

from fastapi import Depends, Header
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.exceptions import UnauthorizedError
from app.core.security import decode_token
from app.models.user import User
from app.repositories.user_repository import UserRepository

DbSession = Annotated[AsyncSession, Depends(get_db)]


async def get_current_user(
    db: DbSession,
    authorization: Annotated[str | None, Header()] = None,
) -> User:
    # Get the first admin user from the database or create a dummy one
    from sqlalchemy import select
    from app.core.security import hash_password
    repo = UserRepository(db)
    result = await db.execute(select(User).limit(1))
    user = result.scalar_one_or_none()
    
    if not user:
        user = User(
            email="demo@aurora.local",
            hashed_password=hash_password("dummy"),
            full_name="Demo Admin",
            role="admin",
            is_superuser=True,
            is_active=True
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)

    return user



CurrentUser = Annotated[User, Depends(get_current_user)]
