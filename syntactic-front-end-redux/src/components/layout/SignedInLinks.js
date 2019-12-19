import React from "react"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { signOut } from "../../store/actions/authActions"

/**
 * SignedInLinks() Links for main navigation only for authenticated users
 */
const SignedInLinks = props => {
    return (
        <>
            <li className="nav-item">
                <NavLink to="/" className="nav-link">
                    Home
                </NavLink>
            </li>
            <li className="nav-item dropdown">
                <button
                    className="nav-link media"
                    id="navbarDropdownMenuLink"
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
                        <h5 className="mt-0 mb-0">{props.user.first_name} {props.user.last_name}</h5>
                        <span className="role">{props.user.role && props.user.role.map(role => role.name.toUpperCase())}</span>
                    </div>
                </button>
                <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdownMenuLink"
                >
                    <button className="dropdown-item" onClick={props.signOut}>
                        Log Out
                    </button>
                </div>
            </li>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
