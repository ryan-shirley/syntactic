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
                <FontAwesomeIcon icon={faHome} className="text-warning" />
                Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/projects">
                <FontAwesomeIcon icon={faThumbtack} className="text-orange" />
                Projects
            </Nav.Link>
            <Nav.Link as={NavLink} to="/levels">
                <FontAwesomeIcon icon={faBolt} className="text-info" />
                Levels*
            </Nav.Link>
            <Nav.Link as={NavLink} to="/billing">
                <FontAwesomeIcon icon={faWallet} className="text-danger" />
                Billing*
            </Nav.Link>
            <Nav.Link as={NavLink} to="/earnings">
                <FontAwesomeIcon icon={faMoneyBill} className="text-success" />
                Earnings*
            </Nav.Link>
        </Nav>
    )
}

export default WriterLinks
