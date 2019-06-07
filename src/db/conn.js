const mysql = require('mysql')
const { promisify } = require('util')

var conn = mysql.createPool({
  connectionLimit: 2,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'to-do-app'
})

conn.query = promisify(conn.query)

module.exports = conn