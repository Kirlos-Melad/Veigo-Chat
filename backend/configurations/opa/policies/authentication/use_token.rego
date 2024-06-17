package use_token

import data.authorizer

default allow := false

allow {
    question := {
        "configuration": {
            "type": "device",
            "resource": input.subject,
            "paths": [
				"forceRefreshToken",
				"forceSignIn"
			],
			"values": [
				"false",
				"false"
			]
        }
    }
    is := authorizer.Ask(question)
    # Allow the use of the token if none of the force flags are set
    is.configured
}