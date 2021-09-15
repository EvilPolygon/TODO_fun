import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'
import { useMessage } from '../hooks/message.hook'
import M from 'materialize-css'
import './modal.css'

export const TasksModal = ({ active, setActive, form, stateForm }) => {

    useEffect(() => {
        M.AutoInit();
    }, [])

    const auth = useContext(AuthContext)
    const message = useMessage()
    const { error, request, clearError } = useHttp()

    /*const [form, stateForm] = useState(
        {
            header: '',
            description: '',
            priority: '',
            responsible: '',
            end_time: '',
            u_id: auth.u_id
        }
    )*/

    const [checked, setChecked] = useState(false)
    const [purpose, setPurpose] = useState(false)

    const resetForm = () => {
        stateForm({
            header: '',
            description: '',
            priority: '',
            responsible: '',
            end_time: '',
            u_id: auth.userId,
            isSupervisor: auth.supervisor
        })
        setChecked(false)
        setActive(false)
    }

    const [time, getFormTime] = useState('')
    const [date, getFormDate] = useState('')

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        stateForm({ ...form, [event.target.name]: event.target.value })
    }

    const getTime = event => {
        getFormTime(event.target.value)
        setDateTime()
    }

    /*if (purpose != null) {
        stateForm(() => {
            return {
                header: purpose.header,
                description: purpose.description,
                priority: purpose.priority,
                responsible: purpose.responsible,
                end_time: '',
                u_id: purpose.u_id
            }
        }
        )
    }
    else {
        stateForm(() => {
            return {
                header: '',
                description: '',
                priority: '',
                responsible: '',
                end_time: '',
                u_id: auth.userId
            }
        }
        )
    }*/


    const getDate = event => {
        getFormDate(event.target.value)
        setDateTime()
    }


    const setDateTime = useCallback(() => {
        if (time && date) {
            console.log(date, time)
            let dateStr = `${date}T${time}:00.000+05:00`
            stateForm({ ...form, end_time: Date.parse(dateStr) })
        }
    }, [time])



    const createTask = async () => {
        try {
            console.log(form.end_time)
            console.log(JSON.stringify(form))
            if (form.end_time = '') {
                throw new Error('Необходимо указать время и дату окончания задачи')
            }
            await request('/api/tasks/create', 'POST', { ...form })
            auth.setUpdated(true)
            resetForm()
        } catch (e) {

        }
    }
    console.log('is supervisor ', auth.supervisor, JSON.stringify(form))

    const deleteTask = async () => {
        try {
            await request('/api/tasks/delete', 'POST', { ...form })
            auth.setUpdated(true)
            resetForm()
        } catch (e) {

        }

    }

    const updateTask = async () => {
        try {
            if (form.end_time = '') {
                throw new Error('Необходимо указать время и дату окончания задачи')
            }
            await request('/api/tasks/update', 'POST', { ...form })
            auth.setUpdated(true)
            resetForm()
        } catch (e) {

        }
    }

    const changeStatus = async () => {
        try {
            
            await request('/api/tasks/updateStatus', 'POST', { ...form })
            auth.setUpdated(true)
            resetForm()

        } catch (e) {
            
        }
    }

    useEffect(() => {
        if (!checked && active) {
            setPurpose(form.header == '')
            setChecked(true)
        }

    })
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
                            <option value={form.priority == '' ? '' : form.priority} defaultValue>{form.priority == '' ? 'Выберите приоритет задачи' : form.priority}</option>
                            <option name="priority" value="Низкий">Низкий</option>
                            <option name="priority" value="Средний">Средний</option>
                            <option name="priority" value="Высокий" >Высокий</option>
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
                            onClick={updateTask}
                        > Изменить
                        </button>
                    }
                    {!purpose ?
                        <button
                            className="btn cyan darken-4"
                            style={{ marginRight: 10 }}
                            onClick={changeStatus}
                        >
                        Изменить статус
                        </button>
                        : null}
                    <button
                        className="btn grey lighten-1 black-text"
                        style={{ marginRight: 10 }}
                        onClick={resetForm}
                    > Закрыть
                    </button>
                    {!purpose ?
                        <button
                            className="btn red lighten-1 black-text right"
                            onClick={deleteTask}
                        > Удалить
                        </button>
                        :
                        null}
                </div>

            </div>
        </div>
    )
}