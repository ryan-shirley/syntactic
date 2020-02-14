import React from "react"
import { connect } from "react-redux"
import { default as ContentSeekerProjects } from "./contentSeeker/ProjectsContainer"
import { default as WriterProjects } from "./writer/ProjectsContainer"

// Actions
import { getAllProjects } from "../../store/actions/projectsActions"

const ProjectsAuthManager = props => {
    const { user } = props
    const role = user.role[0].name

    // Request All projects
    props.getAllProjects()

    if (role === "writer") {
        return <WriterProjects />
    } else if (role === "content seeker") {
        return <ContentSeekerProjects />
    }
}

// Mapping
const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllProjects: () => dispatch(getAllProjects())
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsAuthManager)
