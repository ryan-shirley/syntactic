import React from "react"
import { connect } from "react-redux"
import { default as ContentSeekerProjects } from "./contentSeeker/ProjectsContainer"
import { default as WriterProjects } from "./writer/ProjectsContainer"

const ProjectsAuthManager = props => {
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

export default connect(mapStateToProps)(ProjectsAuthManager)
