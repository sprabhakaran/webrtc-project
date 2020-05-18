module.exports = class AppError extends Error {
    constructor(msg){
        super(msg)
        this.message = msg;
        this.name = msg
    }

    toString(){
        return {reason: this.msg}
    }
}