// React
import React, { Component } from "react"

// Redux
import { connect } from "react-redux"

// Components
import OverviewComponent from "./OverviewComponent"

// Actions
import { createProject } from "../../../store/actions/projectsActions"

class ProjectCreateContainer extends Component {
    /**
     * componentWillMount() Clear single project state if creating new project
     */
    componentWillUnmount () {
        const path = this.props.location.pathname
        if (path !== "/projects/create") {
            this.props.clearSingleProject()
        }
    }

    render() {
        const path = this.props.location.pathname

        // Dynamic depending on route
        if (path === "/projects/create") {
            return <OverviewComponent {...this.props} />
        } else {
            return "Project alread created but needs more creating"
        }
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
        createProject: project => dispatch(createProject(project)),
        clearSingleProject: () => dispatch({ type: "CLEAR_SINGLE_PROJECT" })
    }
}

// Export
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectCreateContainer)
