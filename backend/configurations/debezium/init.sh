#!/bin/bash

# Ensure necessary environment variables are set
REQUIRED_VARS=("DEBEZIUM_CONNECTION" "DB_HOST" "DB_PORT" "DB_USER" "DB_PASSWORD" "DB_AUTH_NAME" "DB_CHAT_NAME")
for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var}" ]; then
    echo "Error: $var environment variable is not set."
    exit 1
  fi
done

# Loop on the connectors and upload each file
for file in ./connectors/*
do
  echo "Uploading $file connector..."

  # Substitute environment variables in the file and save to a temporary file
  TEMP_FILE=$(mktemp)
  envsubst < "$file" > "$TEMP_FILE"

  curl -i -X POST -H "Accept:application/json" -H "Content-Type:application/json" $DEBEZIUM_CONNECTION/connectors -T "$TEMP_FILE"

  echo -e "\n\n"
done