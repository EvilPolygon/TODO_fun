import {Modal} from '../modals/auth.modal'
import {useState} from 'react'

export const AuthPage = () => {
    const [modalActive, setModalActive] = useState(false)
    const [signUp, setSignUp] = useState(false)    

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Добро пожаловать</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Card Title</span>
                        <p>Это тестовое задание TODO листа. Все через это проходят. Вот и я иду.</p>
                    </div>
                    <div className="card-action">
                        <button 
                        className="btn light-blue darken-4"
                        style = {{marginRight: 10 }}
                        onClick = {() => {setModalActive(true); setSignUp(false)}}
                        >
                            Вход
                        </button>
                        <button 
                        className="btn light-blue darken-4"
                        onClick = {() => {setModalActive(true); setSignUp(true)}}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
            <Modal active = {modalActive} setActive = {setModalActive} signUp = {signUp}/>
        </div>        
    )
}