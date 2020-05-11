
module.exports = function(app) {
    app.get("/register", require("./app/login").register)
}
