#!/bin/bash
export NODE_NO_WARNINGS=1

CURRENT_DIR=$(dirname "$0")
cd "${CURRENT_DIR}/.."

# Define the source, destination and difinitions directories
SOURCE_DIR="../configurations/protocol-buffers"
DESTINATION_DIR="./source/types/generated/protos"
DIFINITIONS_DIR="${DESTINATION_DIR}/definitions"

echo -e "Cleaning up \"${DESTINATION_DIR}\" directory\n"
rm -rf "${DESTINATION_DIR}" && mkdir -p "${DESTINATION_DIR}" && mkdir -p "${DIFINITIONS_DIR}"

echo -e "Copying protocol buffer definitions from \"${SOURCE_DIR}\" to \"${DIFINITIONS_DIR}\"\n"
find "${SOURCE_DIR}" -type f -exec cp -r "{}" "${DIFINITIONS_DIR}" \;

echo -e "Generating types from protocol buffer definitions\n"
# Initialize an array to hold the include directories
include_dirs=()

# Loop through the subdirectories in "${DIFINITIONS_DIR}" that contain a "definitions" directory
for dir in "${DIFINITIONS_DIR}"/*; do
    # Check if the directory exists to avoid adding non-existent paths
    if [ -d "$dir" ]; then
        include_dirs+=("$dir")
    fi
done
# Generate types from protocol buffer definitions
npx proto-loader-gen-types \
    --grpcLib=@grpc/grpc-js \
    --includeDirs="${include_dirs[@]}" \
    --outDir="${DESTINATION_DIR}" \
    "${DIFINITIONS_DIR}"/*.proto

echo "All types generated"