import React from 'react'
import { Switch } from 'react-router-dom'
import LayoutManager from './LayoutManager'

// Pages - No Auth
import Home from "./components/pages/Home"
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import NotFound404 from "./components/pages/NotFound404"

// Pages - Auth Required
import Dashboard from "./components/dashboard/Dashboard"

// Pages - Auth - Writer Only
import Levels from "./components/pages/writer/Levels"
import OnboardingWriter from "./components/pages/writer/Onboarding"
import WriterOnboarding from "./components/categories/CreateCategory"

// Page - Auth - Content Seeker Only


// All Routes to use the app layout
const appLayoutRoutes = [
    {
        path: '/dashboard',
        page: Dashboard,
        auth: true
    },
    {
        path: '/levels',
        page: Levels,
        auth: true
    }
]

// Full-With Routes
const fullWithRoutes = [
    {
        path: '/',
        page: Home,
        exact: true
    },
    {
        path: '/signin',
        page: SignIn
    },
    {
        path: '/signup',
        page: SignUp
    },
    {
        path: '/onboarding/writer',
        page: OnboardingWriter
    },
    {
        path: '*',
        page: NotFound404
    }
]

const Routes = () => (
    <main>
        <Switch>
            { appLayoutRoutes.map((route) => ( <LayoutManager authRequired={route.auth} path={route.path} page={route.page} exact={route.exact ? true : false} layout="app" key={route.path} /> )) }
            { fullWithRoutes.map((route) => ( <LayoutManager authRequired={route.auth} path={route.path} page={route.page} exact={route.exact ? true : false} layout="full" key={route.path} /> )) }
        </Switch>
    </main>
)

export default Routes
