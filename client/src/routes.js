import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from './pages/auth'
import { TasksPage } from './pages/tasks'

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>
                <Route path='/tasks' exact>
                    <TasksPage />
                </Route>
                <Redirect to = '/tasks' />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage />
            </Route>
            <Redirect to = '/' />
        </Switch>
    )
}