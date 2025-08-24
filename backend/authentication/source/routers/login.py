from fastapi import APIRouter

from source.utilities.security.jwt import TokenSubject, get_token_manager
from source.utilities.security.password import PasswordManager
from source.models.account import AccountModel
from source.models.device import DeviceModel
from source.schemas.account import AccountCreateSchema, AccountSchema
from source.schemas.device import DeviceUpsertSchema, TokensSchema
from source.schemas.login import LoginSchema, SignInSchema, SignUpSchema
from source.services.account import AccountService
from source.services.device import DeviceService
from source.infrastructure.database import SessionDependency

router = APIRouter()


@router.post("/signup", response_model=LoginSchema)
async def sign_up(data: SignUpSchema, session: SessionDependency) -> LoginSchema:
    account_service = AccountService(session)
    device_service = DeviceService(session)

    account = await account_service.create(
        AccountCreateSchema(
            email=data.email,
            password=data.password,
            phone=data.phone
        )
    )
    
    # Create device after successful account creation
    device = await device_service.upsert(
        DeviceUpsertSchema(
            account_id=account.id,
            client_id=data.client_id,
        )
    )

    return await _login(account, device)


@router.post("/signin", response_model=LoginSchema)
async def sign_in(data: SignInSchema, session: SessionDependency) -> LoginSchema:
    account_service = AccountService(session)
    device_service = DeviceService(session)

    account = await account_service.get_by_email(data.email, fetch_password=True)

    if not (account and PasswordManager().verify(data.password, account.password)):
        raise Exception("Invalid credentials")
    
    device = await device_service.upsert(
        DeviceUpsertSchema(
            account_id=account.id,
            client_id=data.client_id,
        )
    )

    return await _login(account, device)


async def _login(account: AccountModel, device: DeviceModel) -> LoginSchema:
    subject = TokenSubject(account_id=account.id, client_id=device.client_id)
    access_token = get_token_manager().encode("access", str(device.access_token), subject)
    refresh_token = get_token_manager().encode("refresh", str(device.refresh_token), subject)

    account_schema = AccountSchema.model_validate(account)

    return LoginSchema(
        **account_schema.model_dump(),
        client_id=device.client_id,
        tokens=TokensSchema(
            access=access_token,
            refresh=refresh_token
        )
    )
