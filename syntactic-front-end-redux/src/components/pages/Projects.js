import React from "react"
import { connect } from "react-redux"
import { default as ContentSeekerProjects } from "../pages/content-seeker/Projects"
import { default as WriterProjects } from "../pages/writer/Projects"

const Projects = props => {
    const { user } = props
    const role = user.role[0].name

    if (role === "writer") {
        return <WriterProjects />
    } else if (role === "content seeker") {
        return <ContentSeekerProjects />
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Projects)
