import React from 'react'
import { Switch } from 'react-router-dom'
import LayoutManager from './app/layout/LayoutManager'

// Pages - No Auth
import Home from "./app/home/HomeContainer"
import SignIn from "./app/auth/SignIn"
import SignUpWriter from "./app/auth/SignUpWriter"
import SignUpContentSeeker from "./app/auth/SignUpContentSeeker"
import NotFound404 from "./app/404"

// Pages - Pre Auth - Role
import RoleComponent from "./app/auth/RoleComponent"

// Pages - Auth - Onboarding
import OnboardingContentSeeker from "./app/onboarding/OnboardingContentSeekerContainer"
import OnboardingWriter from "./app/onboarding/OnboardingWriterContainer"

// Pages - Auth Required
import Dashboard from "./app/dashboard/DashboardContainer"
import EditProfile from "./app/auth/EditProfileContainer"
import Projects from "./app/projects/ProjectsAuthManager"
import ProjectShow from "./app/projects/show/ProjectShowContainer"
import ProjectOverview from "./app/projects/show/ProjectOverviewComponent"
import ProjectChat from "./app/projects/show/ProjectChatComponent"
import ProjectTextEditor from "./app/projects/show/ProjectTextEditorComponent"
import ProjectFinish from "./app/projects/show/ProjectFinishComponent"
import LevelsContainer from "./app/levels/LevelsContainer"
import BillingContainer from "./app/billing/BillingContainer"
import EarningsContainer from "./app/earnings/EarningsContainer"
import PaymentPayContainer from "./app/billing/PaymentContainer"

// Page - Auth - Content Seeker Only
import ProjectCreate from "./app/projects/create/ProjectCreateContainer"

// All Routes to use the app layout
const appLayoutRoutes = [
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
        path: '/account-type',
        page: RoleComponent,
        middleware: {
            type: 'pre-private'
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
        path: '/projects/:id/create',
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
        isFullWidth: true,
        children: [
            {
                path: '/overview',
                page: ProjectOverview,
                showOnRoot: true
            },
            {
                path: '/chat',
                page: ProjectChat
            },
            {
                path: '/editor',
                page: ProjectTextEditor
            },
            {
                path: '/finish',
                page: ProjectFinish
            }
        ]
    },
    {
        path: '/projects',
        page: Projects,
        exact: true,
        middleware: {
            type: 'private'
        }
    },
    {
        path: '/levels',
        page: LevelsContainer,
        middleware: {
            type: 'private',
            role: 'writer'
        }
    },
    {
        path: '/billing/payment/:id',
        page: PaymentPayContainer,
        exact: true,
        middleware: {
            type: 'private',
            role: 'content seeker'
        }
    },
    {
        path: '/billing',
        page: BillingContainer,
        middleware: {
            type: 'private',
            role: 'content seeker'
        }
    },
    {
        path: '/earnings',
        page: EarningsContainer,
        middleware: {
            type: 'private',
            role: 'writer'
        }
    },
    {
        path: '/profile',
        page: EditProfile,
        middleware: {
            type: 'private',
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
