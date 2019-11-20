import React from 'react'
import { Switch } from 'react-router-dom'
import LayoutManager from './LayoutManager'

// Pages
import Home from './pages/home'

// All Routes to use the app layout
const appLayoutRoutes = [
    {
        path: '/',
        page: Home
    }
]

const Routes = () => (
    <main>
        <Switch>
            { appLayoutRoutes.map((route) => ( <LayoutManager path={route.path} page={route.page} layout="app" key={route.path} /> )) }
        </Switch>
    </main>
)

export default Routes
