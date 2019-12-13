import React from "react"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { signOut } from "../../store/actions/authActions"

const SignedInLinks = props => {
    return (
        <React.Fragment>
            <li className="nav-item">
                <NavLink to="/" className="nav-link">
                    Home
                </NavLink>
            </li>
            <li className="nav-item dropdown">
                <a
                    className="nav-link media"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <img
                        src="/img/profile.jpg"
                        className="mr-3 rounded-circle img-fluid"
                        width="40"
                        height="40"
                        alt="Profile"
                    />
                    <div className="media-body">
                        <h5 className="mt-0 mb-0">Ryan Shirley</h5>
                        Writer
                    </div>
                </a>
                <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdownMenuLink"
                >
                    <a className="dropdown-item" onClick={props.signOut}>
                        Log Out
                    </a>
                </div>
            </li>
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
