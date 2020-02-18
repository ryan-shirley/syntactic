// React
import React, { Component } from "react"

// Redux
import { connect } from "react-redux"

// Components
import OverviewComponent from "./OverviewComponent"
import BriefComponent from "./BriefComponent"

// Actions
import {
    createProject,
    getProject,
    uploadBrief
} from "../../../store/actions/projectsActions"

class ProjectCreateContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentView: ""
        }
    }

    /**
     * getDerivedStateFromProps() Load individual project
     */
    static getDerivedStateFromProps(props, state) {
        const path = props.location.pathname

        // Project wasn't just created and don't have or currently fetching
        if (
            path !== "/projects/create" &&
            !props.projects.justCreated &&
            !props.projects.singleProject.title &&
            !props.projects.requestProcessing &&
            !props.projects.error.message
        ) {
            let id = props.match.params.id
            props.getProject(id)
        } else if (props.projects.justCreated) {
            console.log("Was just created")
        }

        // Set current viewing stage
        let project = props.projects.singleProject
        if (project.status !== state.currentView) {
            // Check For Brief
            if (!project.brief) {
                return { currentView: "brief" }
            } else if (!project.resources) {
                return { currentView: "resources" }
            } else if (!project.writer_id) {
                // TODO: If no writer list fetch here
                return { currentView: "writer" }
            } else {
                return { currentView: "review" }
            }
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
        let { currentView } = this.state

        if (this.props.projects.error.code === 401) {
            return this.props.projects.error.message
        }
        // Dynamic depending on route
        else if (path === "/projects/create") {
            return <OverviewComponent {...this.props} />
        } else {
            if (currentView === "brief") {
                return <BriefComponent {...this.props} />
            } else {
                return "Unknown status"
            }
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
        getProject: id => dispatch(getProject(id)),
        uploadBrief: (brief, projectId) =>
            dispatch(uploadBrief(brief, projectId))
    }
}

// Export
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectCreateContainer)
