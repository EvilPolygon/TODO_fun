import { useState } from 'react'
import { AuthContext } from '../context/auth.context'
import { useAuth } from '../hooks/auth.hook'
import { TasksModal } from '../modals/tasks.modal'

export const NavBar = () => {
    const auth = useAuth(AuthContext)

    const [modalActive, setModalActive] = useState(false)

    const logoutHandler = event => {
        auth.logout()
    }

    return (
        <div>
            <nav>
                <div className="nav-wrapper cyan darken-4">
                    <span href="#" className="brand-logo" style={{ marginLeft: 20 }}>TODO List</span>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><button className="btn waves-effect waves-light" onClick={() => setModalActive(true)}>Добавить задачу</button></li>
                        <li><a href='/' onClick={logoutHandler} >Выйти</a></li>
                    </ul>
                </div>
            </nav>

            <TasksModal active={modalActive} setActive={setModalActive} purpose={true} />
        </div>
    )
}