from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr, UUID4
from typing import Optional

class AccountSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID4
    email: EmailStr
    is_email_verified: bool
    phone: Optional[str]
    is_phone_verified: bool
    created_at: datetime
    updated_at: datetime

class AccountCreateSchema(BaseModel):
    email: EmailStr
    password: str
    phone: Optional[str] = None
