import TasksTable from '../components/TasksTable'
import M from 'materialize-css'
import { useEffect, useState } from 'react'

export const TasksPage = () => {

    const [updated, setUpdated] = useState(false)


    const getUpdatedBase = async () => {

    }


    useEffect(() => {
        window.M.AutoInit()
    }, [])

    return (
        <div className="divTable">
        <p>adzxcasd</p>
        <button className="btn red darken-4" onClick={getUpdatedBase}>UPDATE</button>
            <table className="highlight responsive-table ">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Alvin</td>
                        <td>Eclair</td>
                        <td>$0.87</td>
                    </tr>
                    <tr>
                        <td>Alan</td>
                        <td>Jellybean</td>
                        <td>$3.76</td>
                    </tr>
                    <tr>
                        <td>Jonathan</td>
                        <td>Lollipop</td>
                        <td>$7.00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}