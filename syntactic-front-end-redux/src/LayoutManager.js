import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

// Layout
import AppLayout from "./layouts/AppLayout"
import FullLayout from "./layouts/FullLayout"

import { getUser } from "./store/actions/authActions"

class LayoutManager extends Component {
    componentDidMount() {
        const { auth } = this.props

        // Check for user object in store
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
        // TODO: Don't redirect if path contains /onboarding/
        const { completed_onboarding, uid } = auth.user
        if (uid && !completed_onboarding) {
            console.log("User has not completed onboarding")
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
