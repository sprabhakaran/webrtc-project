
var express = require('express')
var router = express.Router()

router.get("/", (req, resp) => {
    var users = [
        {
            user_id: 1001,
            display_name: "Vignesh",
            photo: "<blob>",
            status: "Online",
            conv_id: 10001
        },
        {
            user_id: 1002,
            display_name: "Bharath",
            photo: "<blob>",
            status: "Offline"
        }
    ]

    resp.send(users)
})

module.exports = router