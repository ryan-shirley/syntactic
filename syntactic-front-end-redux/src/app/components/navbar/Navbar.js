import React from "react"
import { Link } from "react-router-dom"
import SignedInLinks from "./SignedInLinks"
import SignedOutLinks from "./SignedOutLinks"
import { connect } from "react-redux"

const Navbar = props => {
    const { auth, user } = props

    const links = auth.uid ? (
        <SignedInLinks user={user} />
    ) : (
        <SignedOutLinks />
    )

    return (
        <nav className="navbar navbar-expand-lg shadow-sm">
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav ml-auto">{links}</ul>
            </div>
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Navbar)
