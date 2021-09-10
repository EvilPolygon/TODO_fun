import React from 'react'
import { TasksModal } from '../modals/tasks.modal'
import { useState } from 'react'

export const TasksTable = ({ data }) => {

    const [modalActive, setModalActive] = useState(false)
    const isDataEmpty = data.length == 0

    let rows = []

    if (!isDataEmpty) {
        for (let i in data) {
            rows.push(
                <tr key={data[i].t_id}
                    onClick={() => alert(data[i].t_id)}
                >
                    <th>{data[i].header}</th>
                    <th>{data[i].end_time}</th>
                    <th>{data[i].priority}</th>
                    <th>{data[i].status}</th>
                    <th>{data[i].responsible}</th>
                </tr>
            )
        }
    }
    else {
        return <h1>Пока что задач нет. Вы можете их добавить с помощью кнопки "добавить задачу".</h1>
    }

    return (

        <>
            <button onClick={() => setModalActive(true)}>MODAL</button>
            <TasksModal active={modalActive} setActive={setModalActive} purpose={false} />
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