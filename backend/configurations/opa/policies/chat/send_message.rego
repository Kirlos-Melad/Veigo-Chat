package send_message

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
    is := authorizer.Ask(question)
    # Allow the user to send a message if they are a member of the room
    is.member
}
