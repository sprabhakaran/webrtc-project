var AppError = require("./AppError")
var SQLQueryAPI = require("./sql/sql_query_api")
exports.register = function(req, resp){
    var body = req.body;
    var username = body.username;
    var password = body.password;
    var repassword = body.repassword;
    var email = body.email;

    validateUserName(username);
    validateRePassword(password, repassword)
    validateEmail(email)

    var userId = Math.floor(Math.random() * 100000);

    SQLQueryAPI.executeQuery("insert into Account (user_id, username, password, email, created_time)"+
    " values ($1::bigint, $2::text, $3::text, $4::text, $5::bigint)", [userId, username, password, email, new Date().getTime()], 
    function(res){
        console.log("Result is ", res)
    })

    resp.send("success")
}

exports.login = function(req, resp){
    resp.send("signin router called")
}

function validateEmail(email){
    if(!email){
        throw new AppError("Email cannot be empty")
    }

    if(!email.match("[a-zA-Z0-9\+_\.]+@[a-z]+.com")){
        throw new AppError("Email format is wrong!")
    }
    

}

function validateUserName(username){
    if(!username){
        throw new AppError("Username cannot be not empty!")
    }
    if(isUserNameExists(username)){
        throw new AppError("Given username already registered!")
    }
}

function isUserNameExists(username) {
    SQLQueryAPI.executeQuery("select * from Account where username=$1::text", [username], function(res){
        if(res.rows.length > 0){
            throw new AppError("Username already exists!")
        }
    });
}

function isEmailAlreadyExists(email) {
    SQLQueryAPI.executeQuery("select * from Account where email=$1::text", [email], function(res){
        if(res.rows.length > 0){
            throw new AppError("Email already exists!")
        }
    });
}

function validateRePassword(password, repassword) {
    if (!password) {
        throw new AppError("Password cannot be empty")
    }

    if (!repassword) {
        throw new AppError("Password cannot be empty")
    }

    if(password != repassword){
        throw new AppError("Password and Repassword is not same")
    }
}