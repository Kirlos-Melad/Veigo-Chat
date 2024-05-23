#!/bin/bash

CURRENT_DIR=$(dirname "$0")
cd "${CURRENT_DIR}/../"

SOURCE_DIR=."./configurations/protocol-buffers/chat"

DESTINATION_DIR="./source/types/generated/protos"

DEFINITIONS_DIR="${DESTINATION_DIR}/definitions"

echo -e "Removing \"${DESTINATION_DIR}\"\n"
rm -rf ${DESTINATION_DIR} 

echo -e "Creating \"${DEFINITIONS_DIR}\"\n"
mkdir -p ${DEFINITIONS_DIR}

echo -e "Copying protocol buffer definitions from \"${SOURCE_DIR}\" to \"${DEFINITIONS_DIR}\"\n"
cp -ra ${SOURCE_DIR}/. ${DEFINITIONS_DIR}

echo -e "Generating types from protocol buffer definitions\n"

npx proto-loader-gen-types \
    --grpcLib=@grpc/grpc-js \
    --outDir=${DESTINATION_DIR} \
    "${DEFINITIONS_DIR}"/*.proto

echo "All types generated"