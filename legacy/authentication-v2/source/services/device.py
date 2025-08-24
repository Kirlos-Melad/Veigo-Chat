import uuid
from sqlalchemy import insert
from sqlalchemy.orm import Session

from source.models.device import DeviceModel
from source.schemas.device import DeviceUpsertSchema

class DeviceService:
    def __init__(self, db: Session):
        self.db = db

    def upsert(self, data: DeviceUpsertSchema) -> DeviceModel:
        device = DeviceModel(**data.model_dump(), access_token=uuid.uuid4(), refresh_token=uuid.uuid4())
        
        # create a new Device
        self.db.merge(device)
        # apply changes
        self.db.flush()

        return device

    def sign_out(self, account_id: int, client_id_list: list[str]) -> None:
        (
            self.db
            .query(DeviceModel)
            .filter(
                DeviceModel.account_id == account_id,
                DeviceModel.client_id.in_(client_id_list)
            )
            .update({
                DeviceModel.force_sign_in: True
            })
        )
