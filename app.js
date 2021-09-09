const express = require('express')
const config = require('config')
const path = require('path')
const pgr = require('pg')

const app = express()

app.use(express.json({extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/tasks', require('./routes/tasks.routes.js'))

const PORT = config.get("PORT") || 5000


const start = async () => {
    try {



        app.listen(PORT, () => {console.log(`App has been successfully started on port ${PORT}...`)})

    } catch (e) {
        console.log(e)
    }
}

start()