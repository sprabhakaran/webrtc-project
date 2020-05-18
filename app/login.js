var AppError = require("./AppError")
var SQLQueryAPI = require("./sql/sql_query_api")
exports.register = async function(req, resp){
    var body = req.body;
    var username = body.username;
    var password = body.password;
    var repassword = body.repassword;
    var email = body.email;
    
    validateUserName(username)
    .then(() => validateRePassword(password, repassword))
    .then(() => validateEmail(email))
    .then(() => {
        var userId = Math.floor(Math.random() * 100000);

        SQLQueryAPI.executeQuery("insert into Account (user_id, username, password, email, created_time)"+
        " values ($1::bigint, $2::text, $3::text, $4::text, $5::bigint)", [userId, username, password, email, new Date().getTime()], 
        function(res){
            resp.send("success")
        })
    })
    .catch(function(err){
        resp.send(err)
    })
}

exports.login = function(req, resp){
    var username = req.body.username;
    var password = req.body.password;
    if(!username){
        throw new AppError("Username cannot be empty")
    }

    if(!password){
        throw new AppError("Password cannot be empty")
    }

    new Promise((resolve, reject) => {
        SQLQueryAPI.executeQuery("select user_id, username, email from account where username=$1::text and password=$2::text", 
        [username, password], (result)=>{
            var resRows = result.rows;
            if(!resRows){
                reject(new AppError("Username & password do not match"))
            }else{
                var res = resRows[0]
                var user = {user_id: res.user_id, username: res.username, email: res.email}
                resolve(user)
            }
        })
    }).then(user => {
        
        resp.cookie('webrtc-ticket', user.user_id+"_"+user.username, {maxAge: 360000})
        resp.send(user)
    }).catch(err => {
        resp.send(err)
    })
    
}

function validateEmail(email){
    return new Promise(function(resolve, reject){
        
        new Promise((res) => {
            if(!email){
                reject(new AppError("Email cannot be empty"))
            } else if(!email.match("[a-zA-Z0-9\+_\.]+@[a-z]+.com")){
                reject(new AppError("Email format is wrong!"))
            }
            res()
        }).then( () => {
            isEmailAlreadyExists(email).then(isExists => {
                if(isExists){
                    reject(new AppError("Email Id already exists."))    
                }
                resolve()
            });
        })
         
    })
    
}

function validateUserName(username){
    return new Promise(function(resolve, reject){
        new Promise(function(res, rej){
            if(!username){
                reject(new AppError("Username cannot be not empty!"))
            }
            res()
        })
        .then(()=> {
            isUserNameExists(username).then(function(isExists){
                if (isExists){
                    reject(new AppError("Given username already registered!"))
                }
                resolve()
            })
        })
        
    })
    
}

function isUserNameExists(username) {
    return new Promise(function(resolve, rej){
        SQLQueryAPI.executeQuery("select * from Account where username=$1::text", [username], function(res){
            resolve(res.rows.length > 0)
        });
    })
}

function isEmailAlreadyExists(email) {
    return new Promise(function(resolve, rej){
        SQLQueryAPI.executeQuery("select * from Account where email=$1::text", [email], function(res){
            resolve(res.rows.length > 0)
        });
    })
}

function validateRePassword(password, repassword) {
    return new Promise((resolve, reject) => {
        if (!password) {
            reject(new AppError("Password cannot be empty"))
        } else if (!repassword) {
            reject(new AppError("Password cannot be empty"))
        } else if(password != repassword){
            reject(new AppError("Password and Repassword is not same"))
        }else {
            resolve()
        }
    })
}