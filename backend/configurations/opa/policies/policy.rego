package authz

import future.keywords.if

# Define the default response structure
default is = {
    "owner": false,
    "member": false,
    "configured": false
}

is := Ask({})

Ask(_) = output if {
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
    output := {
        "owner": response_body.owner,
        "member": response_body.member,
        "configured": response_body.configured
    }
}