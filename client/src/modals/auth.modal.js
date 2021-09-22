import React, {useEffect, useState, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'
import {useMessage} from '../hooks/message.hook'
import './modal.css'

export const Modal = ({ active, setActive, signUp }) => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { error, request, clearError} = useHttp()

    const [form, stateForm] = useState({
        name: '',
        lastname: '',
        patronymic: '',
        login: '',
        password: '',
        supervisor: false
    })

    useEffect(() => {
        message(error)
        clearError()
    },[error, message, clearError])

    const [checked, setChecked] = useState(true)
    
    const changeHandler = event => {
        stateForm({ ...form, [event.target.name]: event.target.value })
    }

    const keyHandler = event => {
        if(event.keyCode === 13){
            loginHandler()
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {
            
        }
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
            
        }        
    }

    const checkBoxHandler = event => {
        //stateForm({ ...form, [event.target.name]: !event.target.value })
        setChecked(!checked)
        form.supervisor = checked      
    }

    const resetForm = () => {
        setActive(false)
        stateForm(
            {
                name: '',
                lastname: '',
                patronymic: '',
                login: '',
                password: '',
                supervisor: false
            }
        )
    }

    //render return
    if (signUp) {

        return (
            <div className={active ? "mdal active" : "mdal"} onClick={resetForm}>
                <div className={active ? "mdal_content active" : "mdal_content"} onClick={e => e.stopPropagation()}>

                    <div >
                        <label htmlFor="name">Имя</label>
                        <input placeholder="Введите имя"
                            type="text"
                            name="name"
                            onChange={changeHandler}
                            value={form.name}
                        />
                        <label htmlFor="lastname">Фамилия</label>
                        <input placeholder="Введите фамилию"
                            type="text"
                            name="lastname"
                            onChange={changeHandler}
                            value={form.lastname}
                        />
                        <label htmlFor="patronymic">Отчество</label>
                        <input placeholder="Введите отчество"
                            type="text"
                            name="patronymic"
                            onChange={changeHandler}
                            value={form.patronymic}
                        />
                        <label htmlFor="login">Логин</label>
                        <input placeholder="Введите логин"
                            type="text"
                            name="login"
                            onChange={changeHandler}
                            value={form.login}
                        />

                    </div>
                    <div>
                        <label htmlFor="password">Пароль</label>
                        <input placeholder="Введите пароль"
                            type="password"
                            name="password"
                            onChange={changeHandler}
                            value={form.password}
                        />

                    </div>

                    <div className="row">
                        <div className = 'col s11' style ={{padding:0}}>
                            <label>Вы руководитель?</label>
                        </div>
                        <div className = 'col s1'>
                            <label>
                                <input 
                                type="checkbox" 
                                name = "supervisor"
                                onClick = {checkBoxHandler}
                                />
                                <span></span>
                            </label>
                        </div>
                    </div>

                    <div className="card-action">
                        <button
                            className="btn light-blue darken-4"
                            style={{ marginRight: 10 }}
                            onClick={registerHandler}
                        > Зарегистрироваться
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={resetForm}
                        > Закрыть
                        </button>
                    </div>

                </div>
            </div>
        )
    }
    else {

        return (
            <div className={active ? "mdal active" : "mdal"} onClick={resetForm}>
                <div className={active ? "mdal_content active" : "mdal_content"} onClick={e => e.stopPropagation()}>

                    <div >
                        <label htmlFor="login">Логин</label>
                        <input placeholder="Введите логин"
                            type="text"
                            name="login"
                            onChange={changeHandler}
                            onKeyUp={keyHandler}
                            value={form.login}
                        />

                    </div>
                    <div>
                        <label htmlFor="login">Пароль</label>
                        <input placeholder="Введите пароль"
                            type="password"
                            name="password"
                            onChange={changeHandler}
                            onKeyUp={keyHandler}
                            value={form.password}
                        />

                    </div>
{/*JSX кнопок */}
                    <div className="card-action">
                        <button
                            className="btn light-blue darken-4"
                            style={{ marginRight: 10 }}
                            onClick={loginHandler}                            
                        > Войти
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={resetForm}
                        > Закрыть
                        </button>
                    </div>

                </div>
            </div>
        )
    }
}
