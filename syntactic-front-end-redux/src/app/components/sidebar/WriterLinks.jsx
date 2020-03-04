// React
import React from "react"
import { NavLink } from "react-router-dom"
import { Nav } from "react-bootstrap"

// Fonts
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faHome,
    faThumbtack,
    faBolt,
    faWallet,
    faMoneyBill
} from "@fortawesome/free-solid-svg-icons"

/**
 * WriterLinks() Sidebar links for a writer
 */
const WriterLinks = () => {
    return (
        <Nav className="flex-column">
            <Nav.Link as={NavLink} to="/dashboard">
                <FontAwesomeIcon icon={faHome} />
                Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/projects">
                <FontAwesomeIcon icon={faThumbtack} />
                Projects
            </Nav.Link>
            <Nav.Link as={NavLink} to="/levels">
                <FontAwesomeIcon icon={faBolt} />
                Levels
            </Nav.Link>
            <Nav.Link as={NavLink} to="/billing">
                <FontAwesomeIcon icon={faWallet} />
                Billing*
            </Nav.Link>
            <Nav.Link as={NavLink} to="/earnings">
                <FontAwesomeIcon icon={faMoneyBill} />
                Earnings*
            </Nav.Link>
        </Nav>
    )
}

export default WriterLinks
