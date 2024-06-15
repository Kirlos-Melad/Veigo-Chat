package read_room

import data.authorizer

default allow := false

allow {
    question := {
        "membership": {
            "type": "room-members",
            "resource": input.roomId,
            "user": input.userId
        },
		"configuration": {
			"type": "room",
			"resource": input.roomId,
			"path": "privacy",
			"value": "public"
		}
    }
    result := authorizer.Ask(question)
	IsAllowed(result)
}

# Allow the user to read the room if they are a member of the room
IsAllowed(answer) { answer.member }
# Allow the user to read the room if the room is configured to allow read by anyone
IsAllowed(answer) { answer.configured }
