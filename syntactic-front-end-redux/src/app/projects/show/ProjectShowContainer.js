// React
import React, { Component } from "react"
import { Redirect } from "react-router-dom"

// Redux
import { connect } from "react-redux"

// Actions
import { getProject } from "../../../store/actions/projectsActions"

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
            "brief not sufficient",
            "invitation pending",
            "invitation rejected"
        ]
        if(creatingStates.includes(this.props.project.status)) {
            return <Redirect to={`/projects/${this.props.project._id}/create`} />
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
        project: state.projects.singleProject,
        requestProcessing: state.projects.requestProcessing,
        error: state.projects.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProject: id => dispatch(getProject(id))
    }
}

// Export
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectShowContainer)
