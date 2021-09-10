import React, { useEffect, useState, useContext, useReducer } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'
import { useMessage } from '../hooks/message.hook'
import M from 'materialize-css'
import './modal.css'

export const TasksModal = ({ active, setActive, purpose }) => {

    useEffect(() => {
        M.AutoInit();
    }, [])

    const auth = useContext(AuthContext)
    const message = useMessage()
    const { error, request, clearError } = useHttp()

    const [form, stateForm] = useState({
        header: '',
        description: '',
        priority: '',
        responsible: '',
        end_time: '',
        u_id: auth.u_id
    })

    const resetForm = () => {
        setActive(false)
        stateForm({
            header: '',
            description: '',
            priority: '',
            responsible: '',
            end_time: '',
            u_id: auth.userId
        })
    }

    const [time, getFormTime] = useState('')
    const [date, getFormDate] = useReducer(,'') //разберись как это работает

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        stateForm({ ...form, [event.target.name]: event.target.value })
    }

    const getTime = event => {
        getFormTime(event.target.value, () => {
            console.log(time)
        })
        setDateTime()
    }

    const getDate = event => {
        getFormDate(event.target.value)
        setDateTime()
    }

    const setDateTime = () => {
        if (time && date) {
            console.log(date, time)
            stateForm({ ...form, end_time: `${date}T${time}:00.000+5:00` })
        }
    }



    const createTask = async () => {
        try {

            console.log(JSON.stringify(form))
            //await request('/api/tasks/create', 'POST', { ...form })

            resetForm()
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
                            <option value="Низкий" defaultValue>Выберите приоритет задачи</option>
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
                            type="date"
                            className="datepickera"
                            name="date"
                            onChange={getDate}
                            value={date}
                        />
                        <input placeholder="Введите Время"
                            type="time"
                            name="time"
                            className="timepickera"
                            onChange={getTime}
                            value={time}
                        />
                    </div>
                </div>

                <div className="card-action" style={{ marginTop: 20 }}>
                    {purpose ?
                        <button
                            className="btn cyan darken-4"
                            style={{ marginRight: 10 }}
                            onClick={createTask}
                        > Создать
                        </button>
                        :
                        <button
                            className="btn blue darken-4"
                            style={{ marginRight: 10 }}
                            onClick={createTask}
                        > Изменить
                        </button>
                    }
                    <button
                        className="btn grey lighten-1 black-text"
                        style={{ marginRight: 10 }}
                        onClick={resetForm}
                    > Закрыть
                    </button>
                    {!purpose ?
                        <button
                            className="btn red lighten-1 black-text right"
                            onClick={() => { }}
                        > Удалить
                        </button>
                        :
                        null}
                </div>

            </div>
        </div>
    )
}