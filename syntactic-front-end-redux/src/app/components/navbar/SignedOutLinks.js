import React from "react"
import { NavLink } from "react-router-dom"

/**
 * SignedOutLinks() Links for main navigation only for non authenticated users
 */
const SignedOutLinks = () => {
    return (
        <div>
            <ul className="right">
                <li>
                    <NavLink to="/signup">Signup</NavLink>
                </li>
                <li>
                    <NavLink to="/signin">Login</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default SignedOutLinks
