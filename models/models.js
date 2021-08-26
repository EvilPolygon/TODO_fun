



//УСТАРЕВШЕЕ РЕШЕНИЕ












const sequelize = require('../db')
const { databaseVersion } = require('../db')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull:false},
    patronymic: {type: DataTypes.STRING},
    login: {type: DataTypes.STRING, unique:true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    employeer: {type: DataTypes.BOOLEAN, allowNull: false}
})

const Tasks = sequelize.define('tasks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
    head: {type: DataTypes.STRING, allowNull:false},
    description: {type: DataTypes.STRING},
    endDate: {type: DataTypes.TIMESTAMP},
    priority: {type: DataTypes.BOOLEAN}, //NULL = low, FALSE = medium, TRUE = high priority
    status: {type: DataTypes.SMALLINT},
    creator: {type: DataTypes.INTEGER},
    responsible: {type: DataTypes.INTEGER}
})

User.hasMany(Tasks)
Tasks.belongTo(User)

module.exports = { 
    User, Tasks
}