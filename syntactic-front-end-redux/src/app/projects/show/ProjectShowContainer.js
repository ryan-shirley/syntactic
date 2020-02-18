// React
import React, { Component } from "react"
import { Redirect } from "react-router-dom"

// Redux
import { connect } from "react-redux"

// Actions
import { getProject, updateWriterDecision } from "../../../store/actions/projectsActions"

// Components
import ReviewComponent from "./ReviewComponent"

class ProjectShowContainer extends Component {
    /**
     * componentWillMount() Load individual project
     */
    UNSAFE_componentWillMount() {
        let id = this.props.match.params.id
        this.props.getProject(id)

        return null
    }

    render() {
        if (this.props.requestProcessing) {
            return <p>Loading...</p>
        }

        // Check if project in creation state
        let creatingStates = [
            "draft",
            "invitation pending",
            "invitation rejected"
        ]
        if(creatingStates.includes(this.props.project.status) && this.props.user.role[0].name === 'content seeker') {
            return <Redirect to={`/projects/${this.props.project._id}/create`} />
        } else if (this.props.project.status === "invitation pending") {
            return <ReviewComponent {...this.props} />
        }

        return (
            <div>
                <h1>This is the project show page</h1>
            </div>
        )
    }
}

// Mapping
const mapStateToProps = state => {
    return {
        user: state.auth.user,
        project: state.projects.singleProject,
        requestProcessing: state.projects.requestProcessing,
        error: state.projects.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProject: id => dispatch(getProject(id)),
        updateWriterDecision: (decision, project) => dispatch(updateWriterDecision(decision, project))
    }
}

// Export
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectShowContainer)
