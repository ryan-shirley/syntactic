// React
import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

// Links
import WriterLinks from "./WriterLinks"
import ContentSeekerLinks from "./ContentSeekerLinks"
import GuestLinks from "./GuestLinks"

const Sidebar = props => {
    const { user, isSidebarOpenMobile } = props
    let links

    if (user.role) {
        let userRole = user.role[0].name

        links = userRole === "writer" ? <WriterLinks /> : <ContentSeekerLinks />
    } else {
        links = <GuestLinks />
    }

    return (
        <div id="sidebar-wrapper" className={"bg-dark" + (isSidebarOpenMobile ? " openMobile" : "")}>
            <div className="sidebar-heading">
                <Link to="/">Syntactic</Link>
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

export default connect(mapStateToProps)(Sidebar)
