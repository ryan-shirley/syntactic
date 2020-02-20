// React
import React, { Component } from "react"

// Redux
import { connect } from "react-redux"

// Components
import OverviewComponent from "./OverviewComponent"
import BriefComponent from "./BriefComponent"
import ResourcesComponent from "./ResourcesComponent"
import WriterComponent from "./WriterComponent"
import ReviewComponent from "./ReviewComponent"
import ProgressIndicatorComponent from "./ProgressIndicatorComponent"

// Actions
import {
    createProject,
    getProject,
    uploadBrief,
    getWriters,
    inviteWriterToProject
} from "../../../store/actions/projectsActions"

class ProjectCreateContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentView: "",
            useProjectState: true
        }

        // Binding this to work in the callback
        this.setCurrentView = this.setCurrentView.bind(this)
    }

    /**
     * getDerivedStateFromProps() Load individual project
     */
    static getDerivedStateFromProps(props, state) {
        const path = props.location.pathname
        let id = props.match.params.id

        // Project wasn't just created and don't have or currently fetching
        if (
            path !== "/projects/create" &&
            !props.projects.justCreated &&
            !props.projects.singleProject.title &&
            !props.projects.requestProcessing &&
            !props.projects.error.message
        ) {
            props.getProject(id)
        } else if (props.projects.justCreated) {
            console.log("Was just created")
        }

        // If no writer list retrieve
        if (
            state.currentView === "writer" &&
            !props.projects.writersList.recommended &&
            !props.projects.requestProcessing &&
            !props.projects.error.message
        ) {
            props.getWriters(id)
        }

        // Set current viewing stage
        let project = props.projects.singleProject
        if (state.useProjectState && project.status) {
            if (project.status === "invitation pending") {
                return { currentView: "review" }
            } else if (!project.brief) {
                return { currentView: "brief" }
            } else if (!project.resources) {
                return { currentView: "resources" }
            } else if (!project.writer_id) {
                return { currentView: "writer" }
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

    /**
     * setCurrentView() Set the current view
     */
    setCurrentView(newView) {
        this.setState({
            currentView: newView,
            useProjectState: false
        })
    }

    render() {
        const path = this.props.location.pathname
        let { currentView } = this.state

        let createComponent

        if (this.props.projects.error.code === 401) {
            return this.props.projects.error.message
        }
        // Dynamic depending on route
        else if (path === "/projects/create") {
            createComponent = <OverviewComponent {...this.props} />
        } else {
            if (currentView === "brief") {
                createComponent = <BriefComponent {...this.props} />
            } else if (currentView === "resources") {
                createComponent = (
                    <ResourcesComponent
                        {...this.props}
                        setCurrentView={this.setCurrentView}
                    />
                )
            } else if (currentView === "writer") {
                createComponent = (
                    <WriterComponent
                        {...this.props}
                        setCurrentView={this.setCurrentView}
                    />
                )
            } else if (currentView === "review") {
                createComponent = <ReviewComponent {...this.props} />
            } else {
                return "Error... Unknown project status/view."
            }
        }

        return (
            <>
                <h1 className="text-center">Create Project</h1>
                <ProgressIndicatorComponent active={currentView} project={this.props.projects.singleProject} onClick={this.setCurrentView} />
                {createComponent}
            </>
        )
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
            dispatch(uploadBrief(brief, projectId)),
        getWriters: id => dispatch(getWriters(id)),
        inviteWriterToProject: (writerId, project) => {
            dispatch(inviteWriterToProject(writerId, project))
        }
    }
}

// Export
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectCreateContainer)
