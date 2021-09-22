const db = require('../db')

class UserController {

    async createUser(reqBody) {
        const {name, lastname, patronymic, login, password, supervisor} = reqBody        
        await db.query(`INSERT INTO users (name, lastname, patronymic, login, password, supervisor) values ($1, $2, $3, $4, $5, $6)`, [name, lastname, patronymic, login, password, supervisor]) 

    }

    async findOneUser(login) {
        const found = await db.query('SELECT * FROM users where login = $1', [login])

        return found.rows
    }

    async findOneUserById(id) {
        const found = await db.query('SELECT * FROM users where u_id= $1', [id])

        return found.rows
    }

}

module.exports = new UserController()