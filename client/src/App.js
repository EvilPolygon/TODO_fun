import {useRoutes} from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import {NavBar} from './components/NavBar'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/auth.context'

import 'materialize-css'

function App() {
  
  const { token, login, logout, userId, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value ={{
      token, login, logout, userId, isAuthenticated, 
    }}>
    <Router>
      {isAuthenticated && <NavBar />}
      <div className = 'container'>
        {routes}
      </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App
