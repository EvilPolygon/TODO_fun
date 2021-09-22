import React, { useContext } from 'react'
import { TasksModal } from '../modals/tasks.modal'
import { useState, useEffect } from 'react'
import { orderBy, findIndex } from 'lodash'
import { AuthContext } from '../context/auth.context'

export const TasksTable = ({ data }) => {

    /*
        здесь только формирование таблицы и ее отображение
    */

    const auth = useContext(AuthContext)

    const [modalActive, setModalActive] = useState(false)
    const [sortType, setSortType] = useState(0)
    const [form, stateForm] = useState(
        {
            header: '',
            description: '',
            priority: '',
            responsible: '',
            end_time: '',
            u_id: ''
        }
    )

    const clickHandler = (dataForModal) => {
        stateForm(
            {
                header: dataForModal.header,
                description: dataForModal.description,
                priority: dataForModal.priority,
                responsible: dataForModal.responsible,
                end_time: '',
                u_id: dataForModal.u_id,
                t_id: dataForModal.t_id
            }
        )
        setModalActive(true)
    }

    const setClassName = (info) => {
        if(info.status === 1){
            return 'teal lighten-4'
        }
        else{
            if((info.end_time - Date.now()) < 0){
                return 'red lighten-4'
            }
        }
    }

    const isDataEmpty = data.length === 0

    const tHead = (
        <thead>
            <tr>
                <th>Заголовок</th>
                <th>Время окончания задачи</th>
                <th>Приоритет</th>
                <th>Статус выполнения</th>
                <th>Ответственный за задачу</th>
            </tr>
        </thead>
    )

    let rows = []

    if (!isDataEmpty) {
        if (sortType === 0) {
            rows = []
            data = orderBy(data, ['header', 'update_time'], ['asc', 'desc']).filter(value => value != null)
            for (let i in data) {
                let time = new Date(Number(data[i].end_time))
                rows.push(
                    <tr key={data[i].t_id}
                        data-key={data[i].t_id}
                        onClick={() => clickHandler(data[i])}
                        className={setClassName(data[i])}
                    >
                        <th>{data[i].header}</th>
                        <th>{`${time.getHours()}:${time.getMinutes()} ${time.getDate()}-${time.getMonth()}-${time.getFullYear()}`}</th>
                        <th>{data[i].priority}</th>
                        <th>{data[i].status}</th>
                        <th>{data[i].responsible}</th>
                    </tr>
                )
            }
        }

        if (sortType === 1) {
            rows = []
            data = orderBy(data, ['end_time']).filter(value => value != null)
            const indexForDay = findIndex(data, (value) => (Number(value.end_time) - Date.now() > 86400000))
            const indexForWeek = findIndex(data, (value) => (Number(value.end_time) - Date.now() > 604800000))


            for (let i in data) {
                let time = new Date(Number(data[i].end_time))

                if (i == 0) {
                    rows.push(<h4>Задачи на этот день</h4>)
                }

                if ((indexForDay != -1) && (i == indexForDay)) {
                    rows.push(<h4>Задачи на этой неделе</h4>)
                }

                if ((indexForWeek != -1) && (i == indexForWeek)) {
                    rows.push(<h4>Остальные задачи</h4>)
                }


                rows.push(
                    <tr key={data[i].t_id}
                        data-key={data[i].t_id}
                        onClick={() => clickHandler(data[i])}
                    >
                        <th>{data[i].header}</th>
                        <th>{`${time.getHours()}:${time.getMinutes()} ${time.getDate()}-${time.getMonth()}-${time.getFullYear()}`}</th>
                        <th>{data[i].priority}</th>
                        <th>{data[i].status}</th>
                        <th>{data[i].responsible}</th>
                    </tr>
                )


            }
        }

        if (sortType === 2) {
            rows = []
            data = orderBy(data, ['responsible']).filter(value => value != null)

            for (let i in data) {
                let time = new Date(Number(data[i].end_time))
                rows.push(
                    <tr key={data[i].t_id}
                        data-key={data[i].t_id}
                        onClick={() => clickHandler(data[i])}
                    >
                        <th>{data[i].header}</th>
                        <th>{`${time.getHours()}:${time.getMinutes()} ${time.getDate()}-${time.getMonth()}-${time.getFullYear()}`}</th>
                        <th>{data[i].priority}</th>
                        <th>{data[i].status}</th>
                        <th>{data[i].responsible}</th>
                    </tr>
                )
            }
        }

    }
    else {
        return <h1>Пока что задач нет. Вы можете их добавить с помощью кнопки "добавить задачу".</h1>
    }

    return (

        <>
            <div style={{ marginTop: 10 }}>
                <span style={{ marginRight: 10 }} >Сортировать по:</span>
                <button style={{ marginRight: 10 }} className="btn waves-effect waves-light" onClick={() => setSortType(0)}>без сортировки</button>
                <button style={{ marginRight: 10 }} className="btn waves-effect waves-light" onClick={() => setSortType(1)}>по дате</button>
                {auth.supervisor ? <button className="btn waves-effect waves-light" onClick={() => setSortType(2)}>по ответственным</button> : null}
            </div>
            <TasksModal active={modalActive} setActive={setModalActive} form={form} stateForm={stateForm} />
            <table className="highlight responsive-table ">
                <thead>
                    <tr>
                        <th>Заголовок</th>
                        <th>Время окончания задачи</th>
                        <th>Приоритет</th>
                        <th>Статус выполнения</th>
                        <th>Ответственный за задачу</th>
                    </tr>
                </thead>

                <tbody>

                    {rows}

                </tbody>
            </table>
        </>



    )
}