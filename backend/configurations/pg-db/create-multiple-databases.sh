#!/bin/bash

set -e
set -u

function create_database() {
	local database=$1

	echo "Creating '$database' for '$POSTGRES_USER'"

	psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" <<-EOSQL
	    CREATE DATABASE $database OWNER $POSTGRES_USER;
	EOSQL
}

if [ -n "$MULTIPLE_DATABASES" ]; then
	echo "Multiple database creation requested: $MULTIPLE_DATABASES"

	for db in $(echo $MULTIPLE_DATABASES | tr ',' ' '); do
		create_database $db
	done

	echo "Multiple databases created"
fi