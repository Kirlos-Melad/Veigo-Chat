from uuid import uuid4, UUID
from sqlalchemy import update
from sqlalchemy.ext.asyncio import AsyncSession

from source.models.device import DeviceModel
from source.schemas.device import DeviceUpsertSchema

class DeviceService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def upsert(self, data: DeviceUpsertSchema) -> DeviceModel:
        device = DeviceModel(**data.model_dump(), access_token=uuid4(), refresh_token=uuid4())
        
        # create a new Device
        await self.db.merge(device)
        # apply changes
        self.db.flush()

        return device

    async def sign_out(self, account_id: UUID, client_id_list: list[str]) -> int:
        result = await self.db.execute(
            update(DeviceModel)
            .where(
                DeviceModel.account_id == account_id,
                DeviceModel.client_id.in_(client_id_list)
            ).values(
                force_sign_in=True,
            )
        )

        return result.rowcount

