const { Router } = require('express')
const router = Router()
const UserController = require('../controlers/user.controller')
const TasksController = require('../controlers/tasks.controller')
const { check, validationResult} = require('express-validator')
const tasksController = require('../controlers/tasks.controller')

router.post('/create',
    [
        check('header', 'Заголовок задачи обязателен').isLength({min: 1}),
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при отправлении задачи'
                })
            }
            const {header, description, end_time, priority, resposible} = req.body

            await tasksController.createTask({header, description, end_time, priority, resposible: 'somebody', u_id: 13, })

            res.json({message: JSON.stringify(req.body)})
            
        } catch (e) {
            res.status(500).json({message: 'Tasks error'})
            throw e
        }
    }
)

module.exports = router