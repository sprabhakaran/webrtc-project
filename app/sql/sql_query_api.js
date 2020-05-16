const { Pool, Client, Query } = require('pg')
const config = require("config")

module.exports = class SQLQueryAPI {
    
    static execute(qryName, params, callbackFn, errHandler){
        var qry = this.getQueryString(qryName, params);
        this.executeQuery(qry, callbackFn)
    }

    static executeQuery(queryString, params, callbackFn){

        console.trace("---------- ", callbackFn)

        const client = new Client(config.db_conf)
        client.connect(err => {
            if(err){
                console.log("Error while connect to the psql : ", err)
            }
        })

        var query = this.getQueryString(queryString, params);

        client.query(query, (err, res) => {
            console.log("Error ", err)
            callbackFn(res)
            // console.log("Result ", res)
            client.end()
        })
    }

    static getQueryString(qryString, params){
        return new Query(qryString, params)
    }
}


