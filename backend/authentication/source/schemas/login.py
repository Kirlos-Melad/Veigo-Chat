from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional

from source.utilities.security.password import PasswordManager
from source.schemas.device import TokensSchema
from source.schemas.account import AccountSchema


class SignUpSchema(BaseModel):
    client_id: str
    email: EmailStr
    password: str
    phone: Optional[str] = None

    @field_validator('password')
    @classmethod
    def validate_and_hash_password(cls, password: str) -> str:
        """Validate and hash the password"""
        password_manager = PasswordManager()
        password_manager.validate(password)
        return password_manager.hash(password)


class SignInSchema(BaseModel):
    client_id: str
    email: EmailStr
    password: str


class LoginSchema(AccountSchema):
    client_id: str
    tokens: TokensSchema