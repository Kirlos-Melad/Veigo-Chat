from typing import List
from fastapi import APIRouter, HTTPException

from source.models.account import AccountModel
from source.models.device import DeviceModel
from source.schemas.account import AccountCreateSchema, AccountSchema
from source.schemas.device import DeviceUpsertSchema, TokensSchema
from source.schemas.login import LoginSchema, SignInSchema, SignUpSchema
from source.services.account import AccountService
from source.services.device import DeviceService
from source.utilities.security import TokenSubject, token_manager, password_manager
from source.infrastructure.database import DatabaseDependency

router = APIRouter()

def _login(account: AccountModel, device: DeviceModel) -> LoginSchema:
    subject = TokenSubject(account_id=device.account_id, client_id=device.client_id)
    access_token = token_manager.encode("access", str(device.access_token), subject)
    refresh_token = token_manager.encode("refresh", str(device.refresh_token), subject)

    account_schema = AccountSchema.model_validate(account)
    
    return LoginSchema(
        **account_schema.model_dump(),
        client_id=device.client_id,
        tokens=TokensSchema(
            access=access_token,
            refresh=refresh_token
        )
    )


@router.post("/signup", response_model=LoginSchema)
async def sign_up(
    data: SignUpSchema, session: DatabaseDependency
) -> LoginSchema:
    account_service = AccountService(session)
    device_service = DeviceService(session)

    account = account_service.create(
        AccountCreateSchema(
            email=data.email,
            password=data.password,
            phone=data.phone
        )
    )
    
    # Create device after successful account creation
    device = device_service.upsert(
        DeviceUpsertSchema(
            account_id=account.id,
            client_id=data.client_id,
        )
    )

    return _login(account, device)


@router.post("/signin", response_model=LoginSchema)
async def sign_in(data: SignInSchema, session: DatabaseDependency) -> LoginSchema:
    account_service = AccountService(session)
    device_service = DeviceService(session)

    account = account_service.get_by_email(data.email)

    if not (account and password_manager.verify(data.password, account.password)):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    device = device_service.upsert(
        DeviceUpsertSchema(
            account_id=account.id,
            client_id=data.client_id,
        )
    )

    return _login(account, device)
