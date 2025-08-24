from sqlalchemy.orm import Session

from source.schemas.account import AccountCreateSchema
from source.models.account import AccountModel

class AccountService:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data: AccountCreateSchema) -> AccountModel:
        account = AccountModel(**data.model_dump())
        
        # create a new account
        self.db.add(account)
        # apply changes
        self.db.flush()
        # get the account
        self.db.refresh(account)

        return account

    def get_by_email(self, email: str) -> AccountModel:
        return self.db.query(AccountModel).filter(AccountModel.email == email).first()