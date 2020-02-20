import React from 'react'
import { Switch } from 'react-router-dom'
import LayoutManager from './app/layout/LayoutManager'

// Pages - No Auth
import Home from "./app/home/HomeContainer"
import SignIn from "./app/auth/SignIn"
import SignUpWriter from "./app/auth/SignUpWriter"
import SignUpContentSeeker from "./app/auth/SignUpContentSeeker"
import NotFound404 from "./app/404"

// Pages - Auth - Onboarding
import OnboardingContentSeeker from "./app/onboarding/OnboardingContentSeekerContainer"
import OnboardingWriter from "./app/onboarding/OnboardingWriterContainer"

// Pages - Auth Required
import Dashboard from "./app/dashboard/DashboardContainer"
import Projects from "./app/projects/ProjectsAuthManager"
import ProjectShow from "./app/projects/show/ProjectShowContainer"
import ProjectChat from "./app/projects/show/ProjectChatComponent"

// Pages - Auth - Writer Only
// import Levels from "./components/pages/writer/Levels"

// import AddContent from "./components/pages/writer/AddContent"

// Page - Auth - Content Seeker Only
import ProjectCreate from "./app/projects/create/ProjectCreateContainer"

// All Routes to use the app layout
const appLayoutRoutes = [
    {
        path: '/',
        page: Home,
        exact: true,
        middleware: {
            type: 'public'
        }
    },
    {
        path: '/login',
        page: SignIn,
        middleware: {
            type: 'public',
            restricted: true
        }
    },
    {
        path: '/register/writer',
        page: SignUpWriter,
        middleware: {
            type: 'public',
            restricted: true
        }
    },
    {
        path: '/register/content-seeker',
        page: SignUpContentSeeker,
        middleware: {
            type: 'public',
            restricted: true
        }
    },
    {
        path: '/dashboard',
        page: Dashboard,
        middleware: {
            type: 'private'
        }
    },
    {
        path: '/projects/create',
        page: ProjectCreate,
        exact: true,
        middleware: {
            type: 'private',
            role: 'content seeker'
        }
    },
    {
        path: '/projects/:id',
        page: ProjectShow,
        middleware: {
            type: 'private'
        },
        children: [
            {
                path: '/chat',
                page: ProjectChat
            }
        ]
    },
    {
        path: '/projects/:id/create',
        page: ProjectCreate,
        exact: true,
        middleware: {
            type: 'private',
            role: 'content seeker'
        }
    },
    {
        path: '/projects',
        page: Projects,
        exact: true,
        middleware: {
            type: 'private'
        }
    },
    // {
    //     path: '/levels',
    //     page: Levels,
    //     middleware: {
    //         type: 'private',
    //         role: 'writer'
    //     }
    // },
    // {
    //     path: '/add-content',
    //     page: AddContent,
    //     middleware: {
    //         type: 'private',
    //         role: 'writer'
    //     }
    // }
]

// Full-With Routes
const fullWithRoutes = [
    {
        path: '/onboarding/writer',
        page: OnboardingWriter,
        middleware: {
            type: 'private',
            role: 'writer'
        }
    },
    {
        path: '/onboarding/content-seeker',
        page: OnboardingContentSeeker,
        middleware: {
            type: 'private',
            role: 'content seeker'
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
    <Switch>
        { appLayoutRoutes.map((route) => ( <LayoutManager route={route} path={route.path} exact={route.exact ? true : false} layout="app" key={route.path} /> )) }
        { fullWithRoutes.map((route) => ( <LayoutManager route={route} path={route.path} exact={route.exact ? true : false} layout="full" key={route.path} /> )) }
    </Switch>
)

export default Routes
