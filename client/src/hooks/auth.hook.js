import { useState, useCallback, useEffect } from "react"

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [supervisor, setSupervisor] = useState(false)

    const login = useCallback((jwtToken, id, isEmp) => {
        setToken(jwtToken)
        setUserId(id)
        setSupervisor(true)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, supervisor: isEmp
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setSupervisor(false)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token && data.supervisor) {
            login(data.token, data.userId, data.supervisor)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, userId, ready, supervisor }
}