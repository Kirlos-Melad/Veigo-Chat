import uuid
from sqlalchemy.orm import deferred
from sqlalchemy import Column, String, Boolean, TIMESTAMP, func
from source.infrastructure.database import BaseTable


class AccountModel(BaseTable):
    __tablename__ = "accounts"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    email = Column(String(255), unique=True, nullable=False)
    is_email_verified = Column(Boolean, default=False, nullable=False)

    phone = Column(String(20), unique=True, nullable=True)
    is_phone_verified = Column(Boolean, default=False, nullable=False)

    password = deferred(Column(String(128), nullable=False))

    created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now(), nullable=False)
