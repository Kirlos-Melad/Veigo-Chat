#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Formatting"
./backend/authentication/scripts/pre-commit-format.sh

echo "Linting"
./backend/authentication/scripts/pre-commit-lint.sh
