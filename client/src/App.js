import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/auth.context'
import {Loader} from './components/Loader'
import {useState} from 'react'

import 'materialize-css'

function App() {

  const { token, login, logout, userId, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  const [updated, setUpdated] = useState(true)  //сигнализирует приложению о том, что нужно обновить таблицу с задачами, передается в контексте

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, updated, setUpdated
    }}>    
      <Router>
        {isAuthenticated && <NavBar />}
        <div className='container'>
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App
