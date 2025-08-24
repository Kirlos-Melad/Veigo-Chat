#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Disable Node.js warnings
export NODE_NO_WARNINGS=1

CURRENT_DIR=$(dirname "$0")
cd "${CURRENT_DIR}/.."

# Define the source, destination and difinitions directories
SOURCE_DIR="../configurations/protocol-buffers"
DESTINATION_DIR="./source/types/generated/protos"
DIFINITIONS_DIR="${DESTINATION_DIR}/definitions"

echo -e "Cleaning up \"${DESTINATION_DIR}\" directory\n"
rm -rf "${DESTINATION_DIR}" && mkdir -p "${DESTINATION_DIR}" && mkdir -p "${DIFINITIONS_DIR}"

# Define the subdirectories to copy protocol buffer definitions from
SUB_DIRECTORIES=("common" "authentication")

echo -e "Copying protocol buffer definitions from \"${SOURCE_DIR}\" to \"${DIFINITIONS_DIR}\"\n"
for sub_directory in "${SUB_DIRECTORIES[@]}"; do
    find "${SOURCE_DIR}/${sub_directory}" -type f -exec cp -r "{}" "${DIFINITIONS_DIR}" \;
done

echo -e "Generating types from protocol buffer definitions\n"
./node_modules/.bin/proto-loader-gen-types  \
    --grpcLib=@grpc/grpc-js \
    --outDir="${DESTINATION_DIR}" \
    "${DIFINITIONS_DIR}"/*.proto

echo "All types generated"