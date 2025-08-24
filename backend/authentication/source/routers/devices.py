from typing import List
from fastapi import APIRouter

from source.schemas.device import LogOutSchema
from source.utilities.security.types import AuthenticationDependency
from source.services.device import DeviceService
from source.infrastructure.database import SessionDependency

router = APIRouter()

@router.post(
    "/signout",
    responses={
        401: {
            "detail": "Not authenticated"
        }
    },
)
async def sign_out(
    data: LogOutSchema,
    token: AuthenticationDependency,
    session: SessionDependency,
) -> None:
    device_service = DeviceService(session)
    
    await device_service.sign_out(token.subject.account_id, data.client_id_list)
