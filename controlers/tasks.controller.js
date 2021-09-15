const db = require('../db')

class TasksController {

    async createTask(reqBody) {

        const {header, description, end_time, priority, responsible, u_id} = reqBody
        let currentTime = new Date()
        //currentTime = currentTime.toISOString()
        await db.query(`INSERT INTO tasks (header, description, end_time, create_time, update_time, priority, status, creator, responsible, user_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, 
                                          [header, description, end_time, Date.parse(currentTime), Date.parse(currentTime), priority, 0, u_id, responsible, u_id]) 
        

    }

    async findTask(login) {
        const found = await db.query('SELECT * FROM users where login = $1', [login])

        return found.rows
    }

    async deleteTask (t_id) {
        await db.query('DELETE FROM tasks where t_id = $1', [t_id.t_id])
    }

    async updateTask (reqBody) {
        const {header, description, end_time, priority, responsible, t_id} = reqBody
        console.log(header)
        await db.query('UPDATE tasks SET header=$1, description=$2, end_time=$3, update_time=$4, priority=$5, responsible=$6        WHERE t_id=$7',[header, description, end_time, Date.now() ,priority, responsible, t_id ])
    }

    async updateStatus (req){
        await db.query('UPDATE tasks SET status = (status+1)%2 WHERE t_id=$1', [req.t_id])
    }

    async getAllTasks () {
        const data = await db.query('SELECT * FROM tasks')
        return data.rows
    }

}

module.exports = new TasksController()