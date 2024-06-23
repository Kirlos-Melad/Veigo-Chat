#!/bin/bash
export NODE_NO_WARNINGS=1

CURRENT_DIR=$(dirname "$0")
cd "${CURRENT_DIR}/../"

SOURCE_DIR=."./configurations/protocol-buffers"

DESTINATION_DIR="./source/types/generated/protos"

SUB_DIRECTORIES=("common" "authentication")

echo -e "Removing \"${DESTINATION_DIR}\"\n"
rm -rf ${DESTINATION_DIR} 

# Loop through each subdirectory in SOURCE_DIR
for directory_name in "${SUB_DIRECTORIES[@]}"; do
    directory_path="${SOURCE_DIR}/${directory_name}"
    definitions_dir="${DESTINATION_DIR}/definitions/${directory_name}"

    echo -e "Creating \"${definitions_dir}\" directory\n"
    mkdir -p "${definitions_dir}"

    echo -e "Copying protocol buffer definitions from \"${directory_path}\" to \"${definitions_dir}\"\n"
    cp -ra "${directory_path}/." "${definitions_dir}"
done

# Initialize an array to hold the include directories
include_dirs=()

# Loop through the subdirectories in "${DESTINATION_DIR}" that contain a "definitions" directory
for dir in "${DESTINATION_DIR}"/definitions/*; do
    # Check if the directory exists to avoid adding non-existent paths
    if [ -d "$dir" ]; then
        include_dirs+=("$dir")
    fi
done

echo -e "Generating types from protocol buffer definitions\n"
npx proto-loader-gen-types \
    --grpcLib=@grpc/grpc-js \
    --includeDirs="${include_dirs[@]}" \
    --outDir="${DESTINATION_DIR}" \
    "${definitions_dir}"/*.proto

echo "All types generated and placed in the corresponding directorys inside \"${DESTINATION_DIR}\""