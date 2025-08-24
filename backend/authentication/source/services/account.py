from sqlalchemy import select
from sqlalchemy.orm import undefer
from sqlalchemy.ext.asyncio import AsyncSession

from source.exceptions.db import DatabaseError
from source.schemas.account import AccountCreateSchema
from source.models.account import AccountModel

class AccountService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, data: AccountCreateSchema) -> AccountModel:
        values = data.model_dump()
        account = AccountModel(**values)

        try:
            # create a new account
            self.db.add(account)
            # apply changes
            await self.db.flush()
            # get the account
            await self.db.refresh(account)
        except Exception as e:
            raise DatabaseError.from_error(e)

        return account

    async def get_by_email(self, email: str, *, fetch_password: bool = False) -> AccountModel | None:
        query = select(AccountModel).where(AccountModel.email == email)
        if fetch_password:
            query = query.options(undefer(AccountModel.password))

        result = await self.db.execute(query)

        return result.scalar_one_or_none()