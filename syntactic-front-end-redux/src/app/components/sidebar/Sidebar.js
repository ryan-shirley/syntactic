// React
import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

// Links
import WriterLinks from "./WriterLinks"
import ContentSeekerLinks from "./ContentSeekerLinks"

const Sidebar = props => {
    const { user } = props
    let userRole = user.role[0].name

    let links = userRole === "writer" ? <WriterLinks /> : <ContentSeekerLinks />

    return (
        <div id="sidebar-wrapper" className="bg-primary">
            <div className="sidebar-heading">
                <Link to="/">Syntactic</Link>
            </div>
            {links}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Sidebar)
