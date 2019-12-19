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

        const { uid } = props.firebaseAuth

        // Get user information if not already in store
        console.log(uid);
        
        if (uid) {
            props.dispatch(getUser())
        }
    }

    render() {
        const {
            authRequired,
            path,
            page,
            exact,
            layout,
            firebaseAuth,
            auth
        } = this.props

        // See if auth is required for route
        if(authRequired) {
            // Auth required
            if(firebaseAuth.uid) {
                // Is logged in

                let { user } = auth // User object from Monogo
                if(!user) {
                    // Wait for user to be loaded
                    return 'Waiting for user object'
                }

                // Additional Middleware checks for auth routes

                // --------------------------------------------------------
                // Redirect onboarding - If completed or not
                // --------------------------------------------------------
                const { completed_onboarding, uid } = user
                
                if (uid && !completed_onboarding) {
                    // console.log("User has not completed onboarding")
                    if (!path.includes("/onboarding/")) {
                        return <Redirect to="/onboarding/writer" />
                    }
                } else if (
                    uid &&
                    completed_onboarding &&
                    path.includes("/onboarding/")
                ) {
                    // console.log("User has completed onboarding")
                    return <Redirect to="/dashboard" />
                }
            }
            else {
                console.log("Not authorised. Redirecting..")
                return <Redirect to="/signin" />
            }
        }


        // Continue to get layouts
        if (layout === "app") {
            return <AppLayout path={path} component={page} exact={exact} />
        } else if (layout === "full") {
            return <FullLayout path={path} component={page} exact={exact} />
        } else {
            return "This layout does not exist."
        }
    }
}

const mapStateToProps = state => {
    return {
        firebaseAuth: state.firebase.auth,
        auth: state.auth
    }
}

export default connect(mapStateToProps)(LayoutManager)
