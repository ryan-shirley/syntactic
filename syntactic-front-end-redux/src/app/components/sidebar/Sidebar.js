// React
import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

// Links
import WriterLinks from "./WriterLinks"
import ContentSeekerLinks from "./ContentSeekerLinks"
import GuestLinks from "./GuestLinks"

const Sidebar = props => {
    const { user, isSidebarOpenMobile, toggleSidebar } = props
    let links

    if (user.role) {
        let userRole = user.role[0].name

        links = userRole === "writer" ? <WriterLinks toggleSidebar={toggleSidebar} /> : <ContentSeekerLinks toggleSidebar={toggleSidebar} />
    } else {
        links = <GuestLinks toggleSidebar={toggleSidebar} />
    }

    return (
        <div id="sidebar-wrapper" className={"bg-dark" + (isSidebarOpenMobile ? " openMobile" : "")}>
            <div className="sidebar-heading">
                <Link to="/" onClick={toggleSidebar}>
                    <img src="/logo.svg" alt="Syntactic" className="logo" />
                </Link>
            </div>
            {links}
            <div className="sidebar-footer">
                Built By
                <a
                    href="https://ryanshirley.ie"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ryan Shirley
                </a>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isSidebarOpenMobile: state.auth.isSidebarOpenMobile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSidebar: () => dispatch({ type: "TOGGLE_MOBILE_SIDEBAR" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
