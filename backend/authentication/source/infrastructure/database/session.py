from typing import AsyncGenerator
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine

from source.infrastructure.application import get_app_settings

_db_config = get_app_settings().db_config
_engine = create_async_engine(_db_config.ToConnectionStringWithDriver(), echo=True)
_engine = _engine.execution_options(isolation_level="SERIALIZABLE")
_async_session_maker: sessionmaker[AsyncSession] = sessionmaker(bind=_engine, class_=AsyncSession, autoflush=False)

async def get_db_session_context() -> AsyncGenerator[AsyncSession, None]:
    async with _async_session_maker() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise