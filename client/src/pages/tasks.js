import {TasksTable} from '../components/TasksTable'
import M from 'materialize-css'
import { useEffect, useState, useCallback, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'

export const TasksPage = () => {

    const {loading, request} = useHttp()
    const auth = useContext(AuthContext)
    
    const [dataRows, setDatarows] = useState(null)   
    

    const getUpdatedBase = useCallback(async () => {
        try {
            const rawData = await request('/api/tasks/getData', 'GET', null)
            const fetchedData = rawData['rawData']
            let currentData = []

            for (let i in fetchedData) {
                currentData[fetchedData[i].t_id - 1 ] = fetchedData[i]
            }
            setDatarows(currentData)
        } catch (e) {
        }
    },[request])

    useEffect(() => {
        if (auth.updated) {
            getUpdatedBase() 
            auth.setUpdated(false)
        }
    }, [getUpdatedBase, auth.updated, auth.setUpdated])

    useEffect(() => {
        M.AutoInit();
    }, [])

    return (
        <div className="divTable">            
            { !loading && dataRows && <TasksTable data = {dataRows}/> }                    
        </div>
    )
}