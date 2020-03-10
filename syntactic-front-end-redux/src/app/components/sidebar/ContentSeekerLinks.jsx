// React
import React from "react"
import { NavLink } from "react-router-dom"
import { Nav } from "react-bootstrap"

// Fonts
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faHome,
    faThumbtack,
    faWallet
} from "@fortawesome/free-solid-svg-icons"

/**
 * ContentSeekerLinks() Sidebar links for a content seeker
 */
const ContentSeekerLinks = props => {
    let { toggleSidebar } = props

    return (
        <Nav className="flex-column">
            <Nav.Link as={NavLink} to="/dashboard" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faHome} />
                Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/projects" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faThumbtack} />
                Projects
            </Nav.Link>
            <Nav.Link as={NavLink} to="/billing" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faWallet} />
                Billing
            </Nav.Link>
        </Nav>
    )
}

export default ContentSeekerLinks

