
var express = require('express')
var router = express.Router()

router.get(":id",function(req, resp){
    resp.send("conversation get method called")
});



module.exports = router