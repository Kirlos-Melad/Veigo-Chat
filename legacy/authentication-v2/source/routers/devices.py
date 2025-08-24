from typing import Any, List
from fastapi import APIRouter

from source.services.device import DeviceService
from source.utilities.security import AuthenticationDependency
from source.infrastructure.database import DatabaseDependency

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
    client_id_list: List[str], # data
    token: AuthenticationDependency, # auth
    session: DatabaseDependency, # db
) -> None:
    device_service = DeviceService(session)
    device_service.sign_out(token.account_id, client_id_list)
