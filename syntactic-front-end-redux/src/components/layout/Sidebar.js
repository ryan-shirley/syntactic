import React from "react"
import { Link } from "react-router-dom"

const Sidebar = () => {
    return (
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                    Dashboard
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/projects">
                    Projects
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/levels">
                    Levels
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/billing">
                    Billing
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/earnings">
                    Earnings
                </Link>
            </li>
        </ul>
    )
}

export default Sidebar
