#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Directory of the project
PROJECT_DIR=$(dirname "$(realpath "$0")")/..

# Change to the project directory
cd "$PROJECT_DIR"

# Get the list of staged files for the authentication project
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACMR --relative | sed 's| |\\ |g')

# Exit early if there are no staged files
[ -z "$STAGED_FILES" ] && exit 0

# Run linter on the staged files
echo "$STAGED_FILES" | xargs ./node_modules/.bin/eslint
