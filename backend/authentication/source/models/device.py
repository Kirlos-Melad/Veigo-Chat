from sqlalchemy import Column, UUID, String, Boolean, ForeignKey, TIMESTAMP, UniqueConstraint, func

from source.infrastructure.database import BaseTable, SoftDeleteBaseTable


class DeviceModel(BaseTable):
    __tablename__ = "devices"

    account_id = Column(UUID, ForeignKey("accounts.id"), primary_key=True)
    client_id = Column(String(36), primary_key=True)

    access_token = Column(UUID, unique=True, nullable=True)
    force_refresh_token = Column(Boolean, default=False, nullable=False)

    refresh_token = Column(UUID, unique=True, nullable=True)
    force_sign_in = Column(Boolean, default=False, nullable=False)

    created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now(), nullable=False)

    __table_args__ = (
        UniqueConstraint("account_id", "client_id"),
    )


# class DeviceActivityModel(SoftDeleteBaseTable):
#     __tablename__ = "device_activities"

#     id = Column(Integer, autoincrement="auto", primary_key=True)

#     # Basic Information
#     account_id = Column(String(36), ForeignKey("accounts.id"))
#     client_id = Column(String(36), ForeignKey("devices.client_id"))
#     ip_address = Column(String(128), nullable=True)

#     # Browser Information
#     browser_name = Column(String(128), nullable=True)
#     browser_version = Column(String(128), nullable=True)

#     # Device Information
#     device_type = Column(String(128), nullable=True)
#     os_name = Column(String(128), nullable=True)
#     os_version = Column(String(128), nullable=True)

#     # Geographic Information
#     country = Column(String(128), ForeignKey("countries.name"))
#     region = Column(String(128), nullable=True)
#     city = Column(String(128), nullable=True)
#     latitude = Column(String(32), nullable=True)
#     longitude = Column(String(32), nullable=True)
#     zip_code = Column(String(32), nullable=True)

#     # Network Information
#     isp = Column(String(128), nullable=True)

#     # Timestamps
#     created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)
#     updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now(), nullable=False)

#     def __repr__(self):
#         return f"<DeviceSession(session_id={self.session_id}, ip_address={self.ip_address})>"
