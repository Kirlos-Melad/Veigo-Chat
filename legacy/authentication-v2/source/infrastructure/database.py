from typing import Annotated
from fastapi import Depends
from sqlalchemy import create_engine, Column, TIMESTAMP, func
from sqlalchemy.orm import declarative_base, sessionmaker, Session, Query, deferred
from sqlalchemy.ext.declarative import declared_attr

from source.infrastructure.application import get_app_settings


_db_config = get_app_settings().db_config
_engine = create_engine(_db_config.ToConnectionStringWithDriver())
_session = sessionmaker(bind=_engine, autoflush=False)

def _get_session():

    with _session() as session:
        session.connection(execution_options={
            "isolation_level": "SERIALIZABLE"
        })

        yield session

        session.commit()


BaseTable = declarative_base()
DatabaseDependency = Annotated[Session, Depends(_get_session)]

class SoftDeleteQuery(Query):
    def __new__(cls, *args, **kwargs):
        # Ensure the query automatically filters soft-deleted records
        query = super().__new__(cls, *args, **kwargs)
        if hasattr(query._entity_from_pre_ent_zero(), 'deleted_at'):
            query = query.filter(query._entity_from_pre_ent_zero().deleted_at == None)
        return query

class SoftDeleteBaseTable(BaseTable):
    __abstract__ = True

    @classmethod
    def __declare_first__(cls):
        cls.__mapper_args__ = {"polymorphic_identity": cls.__name__}

    @declared_attr
    def deleted_at(cls):
        return deferred(Column(TIMESTAMP, nullable=True, default=None))

    @declared_attr
    def query_class(cls):
        return SoftDeleteQuery

    @classmethod
    def query(cls, session):
        return session.query(cls).filter(cls.deleted_at == None)
    
    def delete(self, session):
        """Override the delete method to perform a soft delete instead of an actual delete."""
        self.deleted_at = func.now()  # Set the deleted_at timestamp
        session.commit()  # Commit the session to persist the change
