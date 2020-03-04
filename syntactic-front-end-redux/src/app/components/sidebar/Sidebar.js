// React
import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

// Links
import WriterLinks from "./WriterLinks"
import ContentSeekerLinks from "./ContentSeekerLinks"
import GuestLinks from "./GuestLinks"

const Sidebar = props => {
    const { user } = props
    let links

    if(user.role) {
        let userRole = user.role[0].name

        links = userRole === "writer" ? <WriterLinks /> : <ContentSeekerLinks />
    }
    else {
        links = <GuestLinks />
    }

    return (
        <div id="sidebar-wrapper" className="bg-dark">
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
