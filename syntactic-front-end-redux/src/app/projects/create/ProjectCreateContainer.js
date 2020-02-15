// React
import React from "react"

// Redux
import { connect } from "react-redux"

// Components
import OverviewComponent from "./OverviewComponent"

// Actions
import { createProject } from "../../../store/actions/projectsActions"

const ProjectCreateContainer = props => {
    const path = props.location.pathname

    // Dynamic depending on route
    if(path === '/projects/create') {
        return <OverviewComponent {...props} />
    }
    else {
        return 'Project alread created but needs more creating'
    }
}

// Mapping
const mapStateToProps = state => {
    return {
        projects: state.projects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createProject: project => dispatch(createProject(project))
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreateContainer)
