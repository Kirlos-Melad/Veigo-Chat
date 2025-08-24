#!/bin/sh

# Get the directory of the current script
SCRIPT_DIR=$(dirname "$(realpath "$0")")

# Run Alembic command with dynamic configuration
run_alembic() {
  CMD=$1
  shift
  alembic -c "$SCRIPT_DIR/../../alembic.ini" $CMD "$@"
}
