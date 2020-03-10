// React
import React from "react"
import { NavLink } from "react-router-dom"
import { Nav } from "react-bootstrap"

// Fonts
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faSignInAlt,
    faPenFancy,
    faAddressBook
} from "@fortawesome/free-solid-svg-icons"

/**
 * GuestLinks() Sidebar links for a guests
 */
const GuestLinks = props => {
    let { toggleSidebar } = props

    return (
        <Nav className="flex-column">
            <Nav.Link as={NavLink} to="/login" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faSignInAlt} />
                Log in
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register/writer" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faPenFancy} />
                Register Writer
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register/content-seeker" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faAddressBook} />
                Register Content Seeker
            </Nav.Link>
        </Nav>
    )
}

export default GuestLinks
