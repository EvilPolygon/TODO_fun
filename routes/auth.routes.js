const {Router} = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult} = require('express-validator')


router.post(
    '/register',
    [
        check('name', 'Некорректное имя').isLength({min: 1}),
        check('lastname', 'Некорректная фамилия').isLength({min: 1}),
        check('patronymic', 'Некорректное отчество').isLength({min: 1}),
        check('login', 'Некорректный логин').isLength({min: 1}),
        check('password', 'Некорректный пароль').isLength({min: 6}),
        check('supervisor', 'Ошибка в руководителе').toBoolean()
    ], 
    async (req, res) => {
        try {
            
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при автроизации'
                })
            }
            console.log(JSON.stringify(req.body))
            //const {name, lastname, patronymic, login, password, supervisor} = req.body



        } catch (err) {
            res.status(500).json({message: 'Auth error'})
        }
    }
)

router.post(
    '/login', 
    [
        check('login', 'Введите логин').exists(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе'
                })
            }

            console.log(JSON.stringify(req.body))

        } catch (e) {
            res.status(500).json({message: 'Login error'})
        }
    }
)

module.exports = router