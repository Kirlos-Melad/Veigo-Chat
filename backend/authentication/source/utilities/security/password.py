import re
import bcrypt

class PasswordManager:
    """Handles password validation, hashing, and verification."""

    _PASSWORD_REGEX = re.compile(
        r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$'
    )
    _ERROR_MESSAGE = (
        "The password must contain at least one lowercase letter, "
        "one uppercase letter, one digit, and one special character, "
        "and must be at least 8 characters long."
    )

    def validate(self, password: str) -> None:
        if not self._PASSWORD_REGEX.match(password):
            raise ValueError(self._ERROR_MESSAGE)

    def hash(self, password: str) -> str:
        return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    def verify(self, password: str, hashed: str) -> bool:
        return bcrypt.checkpw(password.encode(), hashed.encode())
