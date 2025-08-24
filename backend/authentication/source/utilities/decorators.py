from functools import wraps
from typing import Callable, Any

from source.infrastructure.database import get_db_session_context


def db_session(func: Callable[..., Any]) -> Callable[..., Any]:
    """
    A decorator to handle Database session management for async functions.
    Automatically manages the session lifecycle: creation, commit, and rollback.
    """
    @wraps(func)
    async def wrapper(*args, **kwargs):
        # Get a session and configure isolation level
        async with get_db_session_context() as session:
            # Inject session into the activity
            kwargs["session"] = session

            # Run the wrapped function
            return await func(*args, **kwargs)


    return wrapper
