// React
import React, { Component } from "react"

// Redux
import { connect } from "react-redux"

// Components
import OverviewComponent from "./OverviewComponent"

// Actions
import { createProject, getProject } from "../../../store/actions/projectsActions"

class ProjectCreateContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    /**
     * getDerivedStateFromProps() Load individual project 
     */
    static getDerivedStateFromProps(props, state) {
        const path = props.location.pathname

        // Project wasn't just created and don't have or currently fetching
        if (path !== "/projects/create" && !props.projects.justCreated && !props.projects.singleProject.title && !props.projects.requestProcessing && !props.projects.error.message) {
            let id = props.match.params.id
            props.getProject(id)
        } else if(path !== "/projects/create") {
            console.log("Was just created")
        }

        return null
    }

    /**
     * componentWillMount() Clear single project state if creating new project
     */
    componentWillUnmount() {
        const path = this.props.location.pathname
        if (path !== "/projects/create") {
            this.props.clearSingleProject()
        }
    }

    render() {
        const path = this.props.location.pathname

        if(this.props.projects.error.code === 401) {
            return this.props.projects.error.message
        }
        // Dynamic depending on route
        else if (path === "/projects/create") {
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
        clearSingleProject: () => dispatch({ type: "CLEAR_SINGLE_PROJECT" }),
        getProject: id => dispatch(getProject(id))
    }
}

// Export
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectCreateContainer)
