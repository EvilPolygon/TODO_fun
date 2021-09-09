const db = require('../db')

class TasksController {

    async createTask(reqBody) {

        const {header, description, end_time, priority, responsible, u_id} = reqBody
        let currentTime = new Date()
        //currentTime = currentTime.toISOString()
        console.log('проверка целостности данных в ДБ')
        console.log(JSON.stringify(description))        
        await db.query(`INSERT INTO tasks (header, description, end_time, create_time, update_time, priority, status, creator, responsible, user_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, 
                                          [header, description, end_time, currentTime, currentTime, priority, 0, 13, responsible, u_id]) 
        

    }

    async findTask(login) {
        const found = await db.query('SELECT * FROM users where login = $1', [login])

        return found.rows
    }

    async deleteTask () {

    }

    async updateTask () {

    }

    async getAllTasks () {
        return await db.query('SELECT * FROM tasks').rows
    }

}

module.exports = new TasksController()