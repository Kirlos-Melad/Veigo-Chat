#!/bin/bash

# Run the grpcurl command and capture the output
output=$(grpcurl -plaintext -import-path ./source/types/generated/protos/definitions/ -proto common_objects.proto -proto health_check.proto localhost:4100 health_check.HealthCheck.Check)

# Parse the JSON output to extract the status field
status=$(echo "$output" | jq -r '.status')

# Check if the status is SERVING
if [ "$status" == "SERVING" ]; then
  exit 0
else
  exit 1
fi
