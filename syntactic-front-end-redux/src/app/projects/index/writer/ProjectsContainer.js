import React, { Component } from "react"
import { connect } from "react-redux"
import { Alert } from "react-bootstrap"

// Components
import ProjectsListContainer from "../../ProjectsListComponent"

class ProjectsContainer extends Component {
    render() {
        let { projects, requestProcessing, error } = this.props.projects

        let projectList = requestProcessing ? (
            "Loading projects..."
        ) : (
            <ProjectsListContainer
                projects={projects}
                loading={requestProcessing}
                history={this.props.history}
            />
        )

        return (
            <>
                <h2>Project List</h2>

                {error && <Alert variant="danger">{error.message}</Alert>}

                {projectList}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects
    }
}

export default connect(mapStateToProps)(ProjectsContainer)
