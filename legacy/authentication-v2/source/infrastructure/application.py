from functools import lru_cache
from typing import Literal
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class DBConfig(BaseModel):
    user: str
    password: str
    host: str
    port: int
    name: str

    def ToConnectionStringWithDriver(self) -> str:
        return f"mysql+mysqldb://{self.user}:{self.password}@{self.host}:{self.port}/{self.name}"
    def ToToConnectionString(self) -> str:
        return f"mysql://{self.user}:{self.password}@{self.host}:{self.port}/{self.name}"


class JWTDuration(BaseModel):
    amount: int = Field(..., description="The amount of time for token duration")
    unit: Literal["microseconds", "milliseconds", "seconds", "minutes", "hours", "days", "weeks"] = Field(..., description="Unit of duration")


class JWTConfig(BaseModel):
    algorithm: Literal["HS256", "HS512", "RS256", "ES256", "A256KW"] = Field(..., description="JWT Signing Algorithm")
    secret_key: str = Field(..., description="Secret key for signing the JWT")
    issuer: str = Field(..., description="Issuer of the JWT token")
    access_audience: str = Field(..., description="Audience of the access token")
    refresh_audience: str = Field(..., description="Audience of the refresh token")
    duration: JWTDuration

class ApplicationSettings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")

    debug: bool = False
    environment: str
    db_config: DBConfig
    jwt_config: JWTConfig


@lru_cache
def get_app_settings() -> ApplicationSettings:
    return ApplicationSettings()