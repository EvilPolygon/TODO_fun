const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    password: '17934862',
    host: 'localhost',
    port: 5432,
    database: 'todo_test'
})

module.exports = pool