#!/bin/sh

# Source the helper script
. "$(dirname "$(realpath "$0")")/alembic_helper.sh"

# Downgrade to specific revision or by one step
TARGET=${1:--1}
run_alembic downgrade "$TARGET"
