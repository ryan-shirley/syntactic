import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Pages
import Home from './pages/home'

const Routes = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
        </Switch>
    </main>
)

export default Routes
