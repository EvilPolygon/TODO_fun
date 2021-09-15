const { Router } = require('express')
const router = Router()
const UserController = require('../controlers/user.controller')
const TasksController = require('../controlers/tasks.controller')
const { check, validationResult } = require('express-validator')
const tasksController = require('../controlers/tasks.controller')
const userController = require('../controlers/user.controller')

router.post('/create',
    [
        check('header', 'Заголовок задачи обязателен').isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при отправлении задачи'
                })
            }
            const { header, description, end_time, priority, responsible, u_id, isSupervisor } = req.body

            const isThisUserExist = await userController.findOneUser(responsible)

            if (isThisUserExist.length == 0) {
                res.status(403).json({ message: 'Пользователя в поле отвественный с таким логином не существует' })
            }
            else {

                if ((!isSupervisor && u_id == isThisUserExist[0].u_id) || (isSupervisor && (!isThisUserExist[0].supervisor || (isThisUserExist[0].u_id == u_id)))) {
                    await tasksController.createTask({ header, description, end_time, priority, responsible, u_id })
                    res.json({ message: JSON.stringify(req.body) })
                }
                else {
                    res.status(403).json({ message: 'Вы не можете назначить отвественным этого пользователя' })
                }
            }

        } catch (e) {
            res.status(500).json({ message: 'Tasks error' })
            throw e
        }
    }
)

router.get('/getData',
    [
        check('header', 'Заголовок задачи обязателен').isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {

            const rawData = await tasksController.getAllTasks()

            res.json({ rawData })


        } catch (e) {
            res.status(500).json({ message: 'Error occur getData route' })
        }
    })

router.post('/delete',
    async (req, res) => {
        try {

            const { responsible, u_id, isSupervisor, t_id } = req.body

            const isThisUserExist = await userController.findOneUser(responsible)

            if (isThisUserExist.length == 0) {
                res.status(403).json({ message: 'Пользователя в поле отвественный с таким логином не существует' })
            }
            else {

                if ((!isSupervisor && u_id == isThisUserExist[0].u_id) || (isSupervisor && (!isThisUserExist[0].supervisor || (isThisUserExist[0].u_id == u_id)))) {
                    await tasksController.deleteTask({ t_id })
                    res.json({ message: 'Задача удалена' })
                }
                else {
                    res.status(403).json({ message: 'Вы не можете удалить эту задачу' })
                }
            }

        } catch (e) {
            res.status(500).json({ message: 'Delete error', e })
        }
    }
)

router.post('/update',
    async (req, res) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при отправлении задачи'
                })
            }
            const { header, description, end_time, priority, responsible, u_id, isSupervisor, t_id } = req.body

            const isThisUserExist = await userController.findOneUser(responsible)

            if (isThisUserExist.length == 0) {
                res.status(403).json({ message: 'Пользователя в поле отвественный с таким логином не существует' })
            }
            else {

                if ((!isSupervisor && u_id == isThisUserExist[0].u_id) || (isSupervisor && (!isThisUserExist[0].supervisor || (isThisUserExist[0].u_id == u_id)))) {
                    await tasksController.updateTask({ header, description, end_time, priority, responsible, u_id, t_id })
                    res.json({ message: JSON.stringify(req.body) })
                }
                else {
                    res.status(403).json({ message: 'Вы не можете изменить эту задачу' })
                }
            }

        } catch (e) {
            res.status(500).json({ message: 'Update error', e })
        }
    }
)

router.post('/updateStatus',
    async (req, res) => {
        try {
            
            const {t_id} = req.body

            await tasksController.updateStatus({t_id})
            res.status(200).json({message:'Статус задачи изменен'})
            
        } catch (e) {
            res.status(500).json({ message: 'Update task error', e })
        }
    }
)

module.exports = router