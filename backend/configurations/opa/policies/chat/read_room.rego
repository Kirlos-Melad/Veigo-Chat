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
			"path": ["privacy"],
			"value": ["public"]
		}
    }
    answer := authorizer.Ask(question)
	IsAllowed(answer)
}

# Allow the user to read the room if they are a member of the room
IsAllowed(is) { is.member }
# Allow the user to read the room if the room is configured to allow read by anyone
IsAllowed(is) { is.configured }
