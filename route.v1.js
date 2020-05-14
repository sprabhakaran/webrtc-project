
module.exports = function(app) {

    var login = require("./app/login");
    app.post("/register", login.register)
    app.get("/login", login.login)

}
