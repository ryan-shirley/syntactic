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
import AddContent from "./components/pages/writer/AddContent"

// Page - Auth - Content Seeker Only


// All Routes to use the app layout
const appLayoutRoutes = [
    {
        path: '/dashboard',
        page: Dashboard,
        middleware: {
            type: 'private'
        }
    },
    {
        path: '/levels',
        page: Levels,
        middleware: {
            type: 'private',
            role: 'writer'
        }
    },
    {
        path: '/add-content',
        page: AddContent,
        middleware: {
            type: 'private',
            role: 'writer'
        }
    }
]

// Full-With Routes
const fullWithRoutes = [
    {
        path: '/',
        page: Home,
        exact: true,
        middleware: {
            type: 'public'
        }
    },
    {
        path: '/signin',
        page: SignIn,
        middleware: {
            type: 'public',
            restricted: true
        }
    },
    {
        path: '/signup',
        page: SignUp,
        middleware: {
            type: 'public',
            restricted: true
        }
    },
    {
        path: '/onboarding/writer',
        page: OnboardingWriter,
        middleware: {
            type: 'private',
            role: 'writer'
        }
    },
    {
        path: '*',
        page: NotFound404,
        middleware: {
            type: 'public'
        }
    }
]

const Routes = () => (
    <main>
        <Switch>
            { appLayoutRoutes.map((route) => ( <LayoutManager route={route} path={route.path} exact={route.exact ? true : false} layout="app" key={route.path} /> )) }
            { fullWithRoutes.map((route) => ( <LayoutManager route={route} path={route.path} exact={route.exact ? true : false} layout="full" key={route.path} /> )) }

            {/* { appLayoutRoutes.map((route) => ( <LayoutManager route={route} exact={route.exact ? true : false} layout="app" key={route.path} /> )) }
            { fullWithRoutes.map((route) => ( <LayoutManager route={route} exact={route.exact ? true : false} layout="full" key={route.path} /> )) } */}
        </Switch>
    </main>
)

export default Routes
