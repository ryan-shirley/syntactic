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

        const { auth } = props

        // Get user information if not already in store
        if (
            Object.entries(auth.user).length === 0 &&
            auth.user.constructor === Object
        ) {
            this.props.dispatch(getUser())
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

        // Redirect if haven't completed onboarding
        const { completed_onboarding, uid } = auth.user
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

        // Redirect if auth and not authorised
        if (authRequired && !firebaseAuth.uid) {
            console.log("Not authorised. Redirecting..")

            return <Redirect to="/signin" />
        } else {
            if (layout === "app") {
                return <AppLayout path={path} component={page} exact={exact} />
            } else if (layout === "full") {
                return <FullLayout path={path} component={page} exact={exact} />
            } else {
                return "This layout does not exist."
            }
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
