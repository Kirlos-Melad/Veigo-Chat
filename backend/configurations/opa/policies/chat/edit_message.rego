package edit_message

import data.authorizer

default allow := false

allow {
    question := {
        "membership": {
            "type": "room-members",
            "resource": input.roomId,
            "user": input.userId
        }
        "ownership": {
            "type": "message",
            "resource": input.messageId,
            "user": input.userId
        }
    }
    result := authorizer.Ask(question)

    # Allow the user to edit the message if they are a member of the room
    answer.member == true
    # Allow the user to edit the message if the room is configured to allow read by anyone
    answer.configured == true
}