import React from "react"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome , faThumbtack, faBolt, faWallet, faMoneyBill } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
    return (
        <ul className="nav flex-column sidebar">
            <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                    <FontAwesomeIcon icon={faHome} className="text-primary mr-2" style={{width:'20px'}} /> Dashboard
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/projects">
                    <FontAwesomeIcon icon={faThumbtack} className="text-orange mr-2" style={{width:'20px'}} /> Projects
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/levels">
                    <FontAwesomeIcon icon={faBolt} className="text-info mr-2" style={{width:'20px'}} /> Levels
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/billing">
                    <FontAwesomeIcon icon={faWallet} className="text-danger mr-2" style={{width:'20px'}} /> Billing
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/earnings">
                    <FontAwesomeIcon icon={faMoneyBill} className="text-success mr-2" style={{width:'20px'}} /> Earnings
                </NavLink>
            </li>
        </ul>
    )
}

export default Sidebar
