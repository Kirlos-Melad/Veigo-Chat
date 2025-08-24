from sqlalchemy import Column, TIMESTAMP, func
from sqlalchemy.orm import declarative_base, Query, deferred, DeclarativeBase
from sqlalchemy.ext.declarative import declared_attr

BaseTable: DeclarativeBase = declarative_base()

class SoftDeleteQuery(Query):
    def __new__(cls, *args, **kwargs):
        # Ensure the query automatically filters soft-deleted records
        query = super().__new__(cls, *args, **kwargs)
        if hasattr(query._entity_from_pre_ent_zero(), "deleted_at"):
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
