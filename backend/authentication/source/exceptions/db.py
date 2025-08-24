import logging
from sqlalchemy import exc as sqla_exc
from asyncpg import exceptions as pg_exc

logger = logging.getLogger(__name__)


class DatabaseError(Exception):
    """
    Factory base class for database-related errors.
    """
    _registry: list[tuple[type, callable]] = []


    def __init__(self, message: str, *, code: str | None = None, details: str | None = None):
        super().__init__(message)
        self.message = message        # short description
        self.code = code              # DB error code (e.g. 23505)
        self.details = details        # raw DB error (safe for logs)

    def __str__(self):
        return f"{self.message} (code={self.code})"

    @classmethod
    def register(cls, exc_type: type):
        """
        Decorator to register a handler for a given DB exception type.
        """
        def decorator(handler):
            cls._registry.append((exc_type, handler))
            return handler
        return decorator

    @classmethod
    def from_error(cls, error: Exception) -> "DatabaseError":
        """
        Factory method: find a registered handler and return the right subclass.
        """
        for exc_type, handler in cls._registry:
            if isinstance(error, exc_type):
                return handler(error)

        # fallback for unhandled errors
        logger.exception("Unhandled exception", exc_info=error)
        return UnknownDatabaseError(error)


# --------------------------
# Specific Errors
# --------------------------

class UniqueViolation(DatabaseError):
    """Raised when a unique constraint is violated."""
    def __init__(self, field: str | None, *, details: str, code: str = "23505"):
        message = f"Unique violation on {field or 'unknown'}"
        super().__init__(message, code=code, details=details)
        self.field = field  # e.g. "email"


class UnknownDatabaseError(DatabaseError):
    """Fallback for unhandled DB errors."""
    def __init__(self, original: Exception):
        self.original = original
        super().__init__("An unexpected error occurred. Please try again later.")


# --------------------------
# Registry Handlers
# --------------------------

@DatabaseError.register(sqla_exc.IntegrityError)
def handle_integrity_error(error: sqla_exc.IntegrityError):
    orig = error.orig

    # Unique violation (Postgres SQLSTATE 23505)
    if getattr(orig, "sqlstate", None) == "23505":
        constraint = getattr(orig, "constraint_name", None)
        details = str(orig)

        # Fallback: try parsing column name from orig.detail
        field = None
        if "Key (" in details:
            # e.g. 'Key (email)=(test4@vchat.com)...'
            import re
            match = re.search(r"Key \((?P<field>\w+)\)=", details)
            if match:
                field = match.group("field")

        return UniqueViolation(field or constraint, details=details)

    # Fallback for other integrity errors
    logger.exception("Unhandled IntegrityError", exc_info=error)
    return UnknownDatabaseError(error)


@DatabaseError.register(sqla_exc.SQLAlchemyError)
def handle_sqlalchemy_error(error: sqla_exc.SQLAlchemyError):
    logger.exception("Unhandled Error", exc_info=error)
    return UnknownDatabaseError(error)


@DatabaseError.register(Exception)
def handle_generic_error(error: Exception):
    logger.exception("Completely unexpected exception", exc_info=error)
    return UnknownDatabaseError(error)
