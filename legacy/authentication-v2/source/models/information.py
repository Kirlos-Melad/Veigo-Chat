# from sqlalchemy import Column, ForeignKey, Integer, String, Text, TIMESTAMP, func
# from sqlalchemy.orm import deferred
# from source.infrastructure.database import BaseTable, SoftDeleteBaseTable



# class FileModel(SoftDeleteBaseTable):
#     __tablename__ = "files"

#     path = Column(Text, primary_key=True)
#     owner_id = Column(String(36), ForeignKey("accounts.id"))

#     name = Column(String(256), nullable=False)
#     type = Column(String(256), nullable=False)
#     size = Column(Integer, nullable=False)

#     created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)
#     deleted_at = deferred(Column(TIMESTAMP, nullable=True))


# class CountryModel(BaseTable):
#     __tablename__ = "countries"

#     name = Column(String(128), primary_key=True)

#     iso_2 = Column(String(2), nullable=True, default=None)
#     iso_3 = Column(String(3), nullable=True, default=None)

#     numeric_code = Column(Integer, nullable=True, default=None)

#     timezone = Column(String(128), nullable=True, default=None)
    
#     flag_path = Column(Text, nullable=True, default=None)

#     created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)
#     updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now(), nullable=False)
