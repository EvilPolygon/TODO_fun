import React from 'react'

export const TasksTable = ({ data }) => {

    console.log(JSON.stringify(data), 'IN TASK TABLE')

    let rows = []

    for (let i in data){
        rows.push(
            <tr key={data[i].t_id} 
            onClick={()=> alert(data[i].t_id)}
            >
                <th>{data[i].header}</th>
                <th>{data[i].end_time}</th>
                <th>{data[i].priority}</th>
                <th>{data[i].status}</th>
                <th>{data[i].responsible}</th>
            </tr>
        )
    }

    return (
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
    )
}