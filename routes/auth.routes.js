const {Router} = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult} = require('express-validator')

router.post(
    '/register',
    [
        //ВАЛИДАЦИЯ ПОЛЬЗОВАТЕЛЯ
    ], 
    async (req, res) => {
        try {
            


        } catch (err) {
            res.status(500).json({message: 'Auth error'})
        }
    }
)