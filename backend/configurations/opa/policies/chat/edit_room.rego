package edit_room

import data.authorizer

default allow := false

allow {
    question := {
        "membership": {
            "type": "room-members",
            "resource": input.roomId,
            "user": input.userId
        }
    }
    result := authorizer.Ask(question)
    # Allow the user to edit the room if they are a member
    result.member
}
