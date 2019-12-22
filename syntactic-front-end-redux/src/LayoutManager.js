import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

// Layout
import AppLayout from "./layouts/AppLayout"
import FullLayout from "./layouts/FullLayout"

import { getUser } from "./store/actions/authActions"

class LayoutManager extends Component {
    constructor(props) {
        super(props)

        // Get user information if not already in store
        const { uid } = props.fbAuth
        if (uid) {
            props.dispatch(getUser())
        }
    }

    render() {
        const {
            route,
            path,
            exact,
            layout,
            fbAuth,
            auth
        } = this.props

        // Route details
        const { page, middleware } = route
        // Middleware
        const { type, restricted = false } = middleware
        const loggedIn = fbAuth.uid || false

        // Public Route
        if(type === "public") {
            if(loggedIn && restricted) {
                console.log("Restriced route. Redirecting..")
                return <Redirect to="/dashboard" />
            }
        }
        // Private Route
        else if (type === 'private') {
            let { user } = auth // User object from Monogo

            if(!loggedIn) {
                console.log("Not authorised. Redirecting..")
                return <Redirect to="/signin" />
            }
            else if(!user.uid) { // No user profile
                // Wait for user to be loaded
                return 'Waiting for user profile to be loaded'
            }
            else if(!user.completed_onboarding) {
                console.log("User has not completed onboarding")
                const { name: role } = user.role[0]

                // Ensure user is not trying to complete onboarding
                if (!path.includes("/onboarding/")) {
                    // Redirect to correct onboarding
                    if(role === 'writer') {
                        return <Redirect to="/onboarding/writer" />
                    }
                    else if (role === 'content-seeker') {
                        return <Redirect to="/onboarding/content-seeker" />
                    }
                    else {
                        return `Role '${role}' is not valid.`
                    }
                }
            }
            else if (path.includes("/onboarding/")) {
                console.log("User has completed onboarding")
                return <Redirect to="/dashboard" />
            }
        }
        else {
            return `Oops 😅 this route type does not exist. Please contact the developer! Route type: ${type}.`
        }

        // Continue to get layouts
        switch (layout) {
            case "app":
                return <AppLayout path={path} component={page} exact={exact} />
            case "full":
                return <FullLayout path={path} component={page} exact={exact} />
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
