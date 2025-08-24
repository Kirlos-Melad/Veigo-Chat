"""empty message

Revision ID: bbd7e8a7730c
Revises: db45d3d28c91
Create Date: 2025-07-26 10:25:50.519893

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bbd7e8a7730c'
down_revision: Union[str, None] = 'db45d3d28c91'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Drop the foreign key constraint first
    op.drop_constraint("devices_account_id_fkey", "devices", type_="foreignkey")

    # Convert both columns to UUID
    op.execute("ALTER TABLE accounts ALTER COLUMN id TYPE uuid USING id::uuid")
    op.execute("ALTER TABLE devices ALTER COLUMN account_id TYPE uuid USING account_id::uuid")

    # Re-create the foreign key constraint
    op.create_foreign_key(
        "devices_account_id_fkey",
        source_table="devices",
        referent_table="accounts",
        local_cols=["account_id"],
        remote_cols=["id"],
        ondelete="RESTRICT"
    )


def downgrade() -> None:
    # Drop FK first
    op.drop_constraint("devices_account_id_fkey", "devices", type_="foreignkey")

    # Revert column types
    op.execute("ALTER TABLE devices ALTER COLUMN account_id TYPE varchar(36) USING account_id::text")
    op.execute("ALTER TABLE accounts ALTER COLUMN id TYPE varchar(36) USING id::text")

    # Re-create original FK
    op.create_foreign_key(
        "devices_account_id_fkey",
        source_table="devices",
        referent_table="accounts",
        local_cols=["account_id"],
        remote_cols=["id"],
        ondelete="CASCADE"
    )

