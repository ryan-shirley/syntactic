import React from "react"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faHome,
    faThumbtack,
    faBolt,
    faWallet,
    faMoneyBill
} from "@fortawesome/free-solid-svg-icons"
import { connect } from "react-redux"

const Sidebar = props => {
    const { user } = props

    if (user.role[0].name === "writer") {
        return (
            <ul className="nav flex-column sidebar">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard">
                        <FontAwesomeIcon
                            icon={faHome}
                            className="text-primary mr-2"
                            style={{ width: "20px" }}
                        />{" "}
                        Dashboard
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/projects">
                        <FontAwesomeIcon
                            icon={faThumbtack}
                            className="text-orange mr-2"
                            style={{ width: "20px" }}
                        />{" "}
                        Projects
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/levels">
                        <FontAwesomeIcon
                            icon={faBolt}
                            className="text-info mr-2"
                            style={{ width: "20px" }}
                        />{" "}
                        Levels
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/billing">
                        <FontAwesomeIcon
                            icon={faWallet}
                            className="text-danger mr-2"
                            style={{ width: "20px" }}
                        />{" "}
                        Billing
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/earnings">
                        <FontAwesomeIcon
                            icon={faMoneyBill}
                            className="text-success mr-2"
                            style={{ width: "20px" }}
                        />{" "}
                        Earnings
                    </NavLink>
                </li>
            </ul>
        )
    } else if (user.role[0].name === "content seeker") {
        return (
            <ul className="nav flex-column sidebar">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard">
                        <FontAwesomeIcon
                            icon={faHome}
                            className="text-primary mr-2"
                            style={{ width: "20px" }}
                        />{" "}
                        Dashboard
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/projects">
                        <FontAwesomeIcon
                            icon={faThumbtack}
                            className="text-orange mr-2"
                            style={{ width: "20px" }}
                        />{" "}
                        Projects
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/billing">
                        <FontAwesomeIcon
                            icon={faWallet}
                            className="text-danger mr-2"
                            style={{ width: "20px" }}
                        />{" "}
                        Billing
                    </NavLink>
                </li>
            </ul>
        )
    } else {
        return (
            <ul className="nav flex-column sidebar">
                <li className="nav-item">
                    <span className="nav-link">This role doesn't exist</span>
                </li>
            </ul>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Sidebar)
