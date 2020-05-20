
var express = require('express')
var router = express.Router()

router.get("/:id",function(req, resp){
    console.log(req.params.id)

    var conv1 = [
        {
            messageID: 100,
            message: "message",
            senderID: 1001,
            ts: new Date(),
        },
        {
            messageID: 101,
            message: "message",
            senderID: 1002,
            ts: new Date(),
        },
        {
            messageID: 102,
            message: "message",
            senderID: 1001,
            ts: new Date(),
        },
        {
            messageID: 103,
            message: "message",
            senderID: 1002,
            ts: new Date(),
        },
        {
            messageID: 104,
            message: "message",
            senderID: 1001,
            ts: new Date(),
        },
        {
            messageID: 105,
            message: "message",
            senderID: 1002,
            ts: new Date(),
        },
        {
            messageID: 106,
            message: "message",
            senderID: 1001,
            ts: new Date(),
        },
        {
            messageID: 107,
            message: "message",
            senderID: 1001,
            ts: new Date(),
        },
        {
            messageID: 108,
            message: "message",
            senderID: 1001,
            ts: new Date(),
        },
        {
            messageID: 109,
            message: "message",
            senderID: 1002,
            ts: new Date(),
        },
        {
            messageID: 1010,
            message: "message",
            senderID: 1002,
            ts: new Date(),
        }
    ]

    resp.send(conv1)

});

module.exports = router