const { Pool, Client } = require('pg')
const config = require("config")
/*
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'webrtc_project',
  password: 'postgres',
  port: 5432,
})
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
*/

console.log(config.db_conf)

const client = new Client(config.db_conf)
client.connect()
client.query('select * from webrtc_project.person', (err, res) => {
    console.log("Error ", err)
  console.log(res)
  client.end()
})