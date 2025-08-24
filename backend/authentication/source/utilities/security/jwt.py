from functools import lru_cache
from typing import Annotated, ClassVar
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import UUID4, BaseModel, field_validator
from datetime import datetime, timedelta, timezone
from typing import Literal

import jwt
from sqlalchemy import select

from source.infrastructure.database.types import SessionDependency
from source.models.device import DeviceModel
from source.infrastructure.application import JWTConfig, get_app_settings
from fastapi import HTTPException, Security

class TokenSubject(BaseModel):
    account_id: UUID4
    client_id: str

    separator: ClassVar[str] = ":"

    def serialize(self) -> str:
        return f"{self.account_id}{self.separator}{self.client_id}"

    @classmethod
    def deserialize(cls, value: str) -> "TokenSubject":
        try:
            account_id, client_id = value.split(cls.separator)
            return cls(account_id=account_id, client_id=client_id)
        except ValueError:
            raise ValueError(f"Invalid format for TokenSubject: '{value}'")

    @field_validator("account_id")
    @classmethod
    def _validate_account_id(cls, v: str) -> str:
        if not v:
            raise ValueError("account_id must not be empty")
        return v

    @field_validator("client_id")
    @classmethod
    def _validate_client_id(cls, v: str) -> str:
        if not v:
            raise ValueError("client_id must not be empty")
        return v

class TokenDecodedPayload(BaseModel):
    id: str
    subject: TokenSubject


class TokenManager:
    """Handles encoding and decoding of JWT tokens."""

    def __init__(self, config: JWTConfig):
        self.config = config

    def encode(
        self,
        type: Literal["access", "refresh"],
        id: str,
        subject: TokenSubject,
    ) -> str:
        if type not in ("access", "refresh"):
            raise ValueError("Token type must be either 'access' or 'refresh'")

        now = datetime.now(timezone.utc)
        audience = self.config.access_audience if type == "access" else self.config.refresh_audience

        payload = {
            "jti": id,
            "iss": self.config.issuer,
            "sub": subject.serialize(),
            "aud": audience,
            "iat": now,
        }

        if type == "access":
            payload["exp"] = now + timedelta(**{
                self.config.duration.unit: self.config.duration.amount
            })

        return jwt.encode(payload, self.config.secret_key, algorithm=self.config.algorithm)

    def decode(self, token: str, type: Literal["access", "refresh"]) -> TokenDecodedPayload:
        if type not in ("access", "refresh"):
            raise ValueError("Token type must be either 'access' or 'refresh'")

        audience = self.config.access_audience if type == "access" else self.config.refresh_audience

        try:
            decoded = jwt.decode(
                token,
                self.config.secret_key,
                algorithms=[self.config.algorithm],
                issuer=self.config.issuer,
                audience=audience,
            )
            return TokenDecodedPayload(
                id=decoded["jti"],
                subject=TokenSubject.deserialize(decoded["sub"]),
            )
        except jwt.PyJWTError as e:
            raise HTTPException(status_code=401, detail=str(e))

@lru_cache()
def get_token_manager() -> TokenManager:
    return TokenManager(get_app_settings().jwt_config)


async def authenticate_token(
    # OAuth2PasswordBearer will extract the token from the Authorization header
    token: Annotated[HTTPAuthorizationCredentials, Security(HTTPBearer())],
    session: SessionDependency,
) -> TokenDecodedPayload:
    payload = get_token_manager().decode(token.credentials, "access")

    device = (await session.execute(
        select(DeviceModel)
        .where(
            DeviceModel.account_id == payload.subject.account_id,
            DeviceModel.client_id == payload.subject.client_id,
        )
    )).scalar_one_or_none()

    if not device or str(device.access_token) != payload.id or device.force_refresh_token:
        raise HTTPException(status_code=401, detail="Invalid token")

    if device.force_sign_in:
        raise HTTPException(status_code=401, detail="Session expired. Please sign in again.")

    return payload