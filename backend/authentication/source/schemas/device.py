from pydantic import BaseModel, UUID4

class DeviceSchema(BaseModel):
    account_id: UUID4
    client_id: str

    access_token_id: str
    force_refresh_token: bool

    refresh_token_id: str
    force_sign_in: bool

    created_at: str
    updated_at: str


class DeviceUpsertSchema(BaseModel):
    account_id: UUID4
    client_id: str

class TokensSchema(BaseModel):
    access: str
    refresh: str

class LogOutSchema(BaseModel):
    client_id_list: list[str]