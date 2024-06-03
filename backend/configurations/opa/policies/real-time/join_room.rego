package join_room

import data.authz

default allow = false

allow {
    question := {
        "membership": {
            "type": "room-members",
            "resource": input.roomId,
            "user": input.userId
        }
    }
    result := authz.Ask(question)
    result.member
}
