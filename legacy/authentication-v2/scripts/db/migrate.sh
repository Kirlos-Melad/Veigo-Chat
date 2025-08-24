#!/bin/sh

# Source the helper script
. "$(dirname "$(realpath "$0")")/alembic_helper.sh"

# Upgrade to head or target revision
TARGET=${1:-head}
run_alembic upgrade "$TARGET"
