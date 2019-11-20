import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LayoutManager from './LayoutManager'

// Pages
import Home from './pages/home'
import About from './pages/about'
import ContentSeekerOnboarding from './pages/onboarding/ContentSeekerOnboarding'

// All Routes to use the app layout
const appLayoutRoutes = [
    {
        path: '/about',
        page: About
    }
]

// Full-With Routes
const fullWithRoutes = [
    {
        path: '/onboarding/content-seeker',
        page: ContentSeekerOnboarding
    }
]

const Routes = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Home}/>
            { appLayoutRoutes.map((route) => ( <LayoutManager path={route.path} page={route.page} layout="app" key={route.path} /> )) }
            { fullWithRoutes.map((route) => ( <LayoutManager path={route.path} page={route.page} layout="full" key={route.path} /> )) }
        </Switch>
    </main>
)

export default Routes
