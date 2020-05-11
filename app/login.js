
exports.register = async function(req, resp){
    resp.send("register router called")
}

exports.login = async function(req, resp){
    resp.send("signin router called")
}
