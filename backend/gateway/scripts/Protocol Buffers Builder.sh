#!/bin/bash

CURRENT_DIR=$(dirname "$0")
cd "${CURRENT_DIR}/.."

SOURCE_DIR="../configurations/protocol-buffers"

DESTINATION_DIR="./source/types/generated/protos"

# definitions_dir="${DESTINATION_DIR}/definitions"

echo -e "Cleaning up \"${DESTINATION_DIR}\" directory\n"
rm -rf "${DESTINATION_DIR}" && mkdir -p "${DESTINATION_DIR}"


# Loop through each subdirectory in SOURCE_DIR
for folder in "${SOURCE_DIR}"/*/; do
    folder_name=$(basename "${folder}")
    definitions_dir="${DESTINATION_DIR}/${folder_name}/definitions"

    echo -e "Creating \"${definitions_dir}\" directory\n"
    mkdir -p "${definitions_dir}"

    echo -e "Copying protocol buffer definitions from \"${folder}\" to \"${definitions_dir}\"\n"
    cp -ra "${folder}/." "${definitions_dir}"

    echo -e "Generating types from protocol buffer definitions for \"${folder_name}\"\n"
    npx proto-loader-gen-types \
        --grpcLib=@grpc/grpc-js \
        --outDir="${DESTINATION_DIR}/${folder_name}" \
        "${definitions_dir}"/*.proto
done

echo "All types generated and placed in the corresponding folders inside \"${DESTINATION_DIR}\""
