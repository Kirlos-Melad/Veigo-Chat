#!/bin/sh

# Source the helper script
. "$(dirname "$(realpath "$0")")/alembic_helper.sh"

# Run alembic revision with optional message
if [ -n "$1" ]; then
  run_alembic revision --autogenerate -m "$1"
else
  run_alembic revision --autogenerate
fi
