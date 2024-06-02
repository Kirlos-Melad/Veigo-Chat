package authz

import rego.v1

# Define the default response structure
default result = {
    "owner": false,
    "member": false,
    "configuration": false
}

# Make a single HTTP request to the server with the input data
response := http.send({
    "method": "post",
    "url": opa.runtime().env["AGGRAGATOR_CONNECTION"],
    "body": input,
    "headers": {
        "Content-Type": "application/json"
    }
})

# Evaluate the response
response_body := response.body

# Update the result based on the response
result.owner = response_body.owner
result.member = response_body.member
result.configuration = response_body.configuration