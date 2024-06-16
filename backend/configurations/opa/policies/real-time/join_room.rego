package join_room

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
    is.member
}
