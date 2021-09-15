const {Router} = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const userController = require('../controlers/user.controller')
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
                    message: 'Некорректные данные при регистрации'
                })
            }
            
            const {name, lastname, patronymic, login, password, supervisor} = req.body

            /*let amIUniqueUser = new Promise((resolve, reject) => {
                const found = userController.findOneUser(login)
                if(!found){
                    reject(new Error('Пользователь с таким логином уже существует'))
                }
                else{
                resolve('done')
                }
            })

            amIUniqueUser.then(
                result => {
                    UserController.createUser({name, lastname, patronymic, login, password: hashedPassword, supervisor})
                    res.status(201).json({message: 'Пользователь создан'})
                },
                reject => res.status(400).json({message: reject})
            )*/

            //await UserController.createUser({name, lastname, patronymic, login, password: hashedPassword, supervisor})
            // fckn jun moment

            const found = await userController.findOneUser(login)

            if(found.length > 0){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Пользователь с таким логином уже существует'                  
                })
            }
            else{
                const hashedPassword = await bcrypt.hash(password, 12)
                await userController.createUser({name, lastname, patronymic, login, password: hashedPassword, supervisor})
                res.status(201).json({message: 'Пользователь создан'})
            }              
            

        } catch (err) {
            res.status(500).json({message: 'Auth error'})
            throw err
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

            const {login, password} = req.body

            const findUser = await userController.findOneUser(login)
            
            if(findUser.length > 0){
                
                const isMatch = await bcrypt.compare(password, findUser[0].password)

                if(!isMatch){
                    return res.status(400).json({message: 'Данные введены неверно'})
                }
                
                const token = jwt.sign(
                    {userLogin: login},
                    config.get('jwtsecret'),
                    {expiresIn: '6h'}
                )
                console.log(JSON.stringify(findUser))
                res.json({token, userId: findUser[0].u_id, isEmp: findUser[0].supervisor})

            }
            else{
                res.status(400).json({message: 'Данные введены неверно'})
            }

        } catch (e) {            
            res.status(500).json({message: 'Login error'})
        }
    }
)

module.exports = router