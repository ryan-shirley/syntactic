// React
import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

// Layout
import AppLayout from "./AppLayout"
import FullLayout from "./FullLayout"

// Actions
import { getUser } from "../../store/actions/authActions"

// Components
import DataLoading from "../components/DataLoading"

class LayoutManager extends Component {
    render() {
        const {
            route,
            path,
            exact,
            layout,
            fbAuth,
            auth,
            computedMatch
        } = this.props

        // Route details
        const { page, middleware, children, isFullWidth = false } = route
        // Middleware
        const { type, restricted = false, role: restrictedRole = false } = middleware
        const loggedIn = fbAuth.uid ? true : false
        
        
        // Public Route
        if(type === "public") {
            if(loggedIn && restricted) {
                // console.log("Restriced route. Redirecting..")
                return <Redirect to="/dashboard" />
            }
        }
        // Private Route
        else if (type === 'private') {
            let { user, loadingUser, error } = auth // User object from Monogo

            if(!loggedIn) {
                // console.log("Not authorised. Redirecting..")
                return <Redirect to="/login" />
            }
            else if(user === null || (Object.keys(user).length === 0 && user.constructor === Object)) { // No user profile
                // Load User details
                if(!loadingUser) {
                    this.props.dispatch(getUser())
                }

                // If no user in mongo redirect to account type page
                if(error && error.code === 404) {
                    return <Redirect to="/account-type" />
                }
                
                // Wait for user to be loaded
                return <DataLoading />
            }
            else if(restrictedRole && user.role[0].name !== restrictedRole) {
                return <Redirect to="/dashboard" />
            }
            else if(!user.completed_onboarding) {
                // console.log("User has not completed onboarding")
                const { name: role } = user.role[0]

                // Ensure user is not trying to complete onboarding
                if (!path.includes("/onboarding/")) {
                    // Redirect to correct onboarding
                    if(role === 'writer') {
                        return <Redirect to="/onboarding/writer" />
                    }
                    else if (role === 'content seeker') {
                        return <Redirect to="/onboarding/content-seeker" />
                    }
                    else {
                        return `Role '${role}' is not valid.`
                    }
                }
            }
            else if (path.includes("/onboarding/")) {
                // console.log("User has completed onboarding")
                return <Redirect to="/dashboard" />
            }
        }
        // Pre Private Route - Account Type
        else if (type === 'pre-private') {
            let { user, loadingUser, error } = auth // User object from Monogo

            if(user === null || (Object.keys(user).length === 0 && user.constructor === Object && !error)) { // No user profile
                // Load User details
                if(!loadingUser) {
                    this.props.dispatch(getUser())
                }

                // If no user in mongo redirect to account type page
                if(error && error.code === 404 && path !== '/account-type') {
                    return <Redirect to="/account-type" />
                }
                
                // Wait for user to be loaded
                return <DataLoading />
            }
            
            // Recirect if not logged in or already have an account
            if(!loggedIn || (user && user._id)) {
                return <Redirect to="/dashboard" />
            }
        }
        else {
            return `Oops 😅 this route type does not exist. Please contact the developer! Route type: ${type}.`
        }

        // Continue to get layouts
        switch (layout) {
            case "app":
                return <AppLayout path={path} component={page} exact={exact} children={children} isExact={computedMatch.isExact} isFullWidth={isFullWidth} />
            case "full":
                return <FullLayout path={path} component={page} exact={exact} children={children} isExact={computedMatch.isExact} />
            default:
                return "Oops this layout does not exist 😅"
        }
    }
}

const mapStateToProps = state => {
    return {
        fbAuth: state.firebase.auth,
        auth: state.auth
    }
}

export default connect(mapStateToProps)(LayoutManager)
