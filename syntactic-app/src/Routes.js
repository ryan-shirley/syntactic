import React from 'react'
import { Switch } from 'react-router-dom'
import LayoutManager from './LayoutManager'

// Pages
import Home from './pages/home'
import About from './pages/about'
import ContentSeekerOnboarding from './pages/onboarding/ContentSeekerOnboarding'
import WriterOnboarding from './pages/onboarding/WriterOnboarding'

import WriterHome from './pages/accounts/writer/WriterHome'
import WriterAddText from './pages/accounts/writer/WriterAddText'

// All Routes to use the app layout
const appLayoutRoutes = [
    {
        path: '/',
        page: Home,
        exact: true
    },
    {
        path: '/about',
        page: About
    },
    {
        path: '/writer/1',
        page: WriterHome
    },
    {
        path: '/addText',
        page: WriterAddText
    }
]

// Full-With Routes
const fullWithRoutes = [
    {
        path: '/onboarding/content-seeker',
        page: ContentSeekerOnboarding
    },
    {
        path: '/onboarding/writer',
        page: WriterOnboarding
    }
]

const Routes = () => (
    <main>
        <Switch>
            { appLayoutRoutes.map((route) => ( <LayoutManager path={route.path} page={route.page} exact={route.exact ? true : false} layout="app" key={route.path} /> )) }
            { fullWithRoutes.map((route) => ( <LayoutManager path={route.path} page={route.page} exact={route.exact ? true : false} layout="full" key={route.path} /> )) }
        </Switch>
    </main>
)

export default Routes
