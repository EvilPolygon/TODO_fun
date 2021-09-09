import React, { useEffect, useState, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'
import { useMessage } from '../hooks/message.hook'
import M from 'materialize-css'
import './modal.css'

export const TasksModal = ({ active, setActive, purpose }) => {

    const [form, stateForm] = useState({
        header: '',
        description: '',
        priority: '',
        responsible: '',
        end_time: ''
    })

    const resetForm = () => {
        setActive(false)
        stateForm({
            header: '',
            description: '',
            priority: '',
            responsible: '',
            end_time: ''
        })
        console.log(JSON.stringify(form))
    }

    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, error, request, clearError } = useHttp()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        M.AutoInit();
    }, [])

    const changeHandler = event => {
        stateForm({ ...form, [event.target.name]: event.target.value })
    }

    const getDate = () => {

    }

    const getTime = () => {

    }

    const createTask = async () => {
        try {
            console.log(JSON.stringify(form))
            const data = await request('/api/tasks/create', 'POST', { ...form })
            message(data.message)
        } catch (e) {

        }
    }

    //window.M.FormSelect.init()

    return (
        <div className={active ? "mdal active" : "mdal"} onClick={resetForm}>
            <div className={active ? "task_modal_content active" : "task_modal_content"} onClick={e => e.stopPropagation()}>
                <div>
                    <label htmlFor="header">Заголовок задачи</label>
                    <input placeholder="Введите имя"
                        type="text"
                        name="header"
                        onChange={changeHandler}
                        value={form.header}
                    />
                    <label htmlFor="description">Опиcание</label>
                    <textarea placeholder="Описание задачи"
                        className="materialize-textarea"
                        type="text"
                        name="description"
                        onChange={changeHandler}
                        value={form.description}
                    />
                    <div className="input-field">
                        <select placeholder="Описание задачи"
                            type="select"
                            name="priority"
                            onChange={changeHandler}>
                            <option value="" disabled selected>Выберите приоритет задачи</option>
                            <option value="Низкий">Низкий</option>
                            <option value="Средний">Средний</option>
                            <option value="Высокий">Высокий</option>
                        </select>
                        <label htmlFor="priority">Приоритет</label>
                    </div>
                    <label htmlFor="responsible">Ответственный</label>
                    <input placeholder="Введите имя"
                        type="text"
                        name="responsible"
                        onChange={changeHandler}
                        value={form.responsible}
                    />
                    <div>
                        <label htmlFor="end_time">Время окончание задачи</label>
                        <input placeholder="Введите Дату"
                            type="text"
                            className="datepicker"
                            value={getDate}
                        />
                        <input placeholder="Введите Время"
                            type="text"
                            className="timepicker"
                            value={getTime}
                        />
                    </div>
                </div>

                <div className="card-action" style={{ marginTop: 20 }}>
                    <button
                        className="btn cyan darken-4"
                        style={{ marginRight: 10 }}
                        onClick={createTask}
                    > Создать
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