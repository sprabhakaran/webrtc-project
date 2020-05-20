
var express = require('express')
var router = express.Router()

router.get("/", (req, resp) => {
    var users = [
        {
            user_id: 1001,
            display_name: "Abel",
            photo: "<blob>",
            status: "Online",
            conv_id: 10001
        },
        {
            user_id: 1002,
            display_name: "Bob",
            photo: "<blob>",
            status: "Offline"
        }
    ]

    resp.send(users)
})

module.exports = router