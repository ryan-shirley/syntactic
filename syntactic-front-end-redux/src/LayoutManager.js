import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

// Layout
import AppLayout from "./layouts/AppLayout"
import FullLayout from "./layouts/FullLayout"

const LayoutManager = ({ authRequired, path, page, exact, layout, auth }) => {
    // Redirect if auth and not authorised
    if (authRequired && !auth.uid) {
        console.log('Not authorised. Redirecting..');
        
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

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(LayoutManager)
