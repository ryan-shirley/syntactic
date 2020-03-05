// React
import React, { Component } from "react"
import { Link } from "react-router-dom"

// Redux
import { connect } from "react-redux"

// Components
import ProjectsListContainer from "../ProjectsListComponent"
import DataLoading from "../../../components/DataLoading"
import Error from "../../../components/Error"
import { Row, Col, Button } from "react-bootstrap"

// Actions
import { deleteProject } from "../../../../store/actions/projectsActions"

class ProjectsContainer extends Component {
    constructor() {
        super()

        this.state = {
            display: 'table'
        }
    }

    render() {
        let { projects, requestProcessing, error } = this.props.projects

        if(!projects.length && requestProcessing && !error) {
            return <DataLoading />
        } else if (!requestProcessing && error) {
            return <Error error={error} />
        }

        return (
            <>
                <Row className="mb-3">
                    <Col>
                        <h1>All Projects</h1>
                    </Col>
                    <Col className="text-right">
                        <Button as={Link} to="/projects/create">
                            New Project
                        </Button>
                    </Col>
                </Row>

                <ProjectsListContainer
                    projects={projects}
                    loading={this.props.projects.requestProcessing}
                    history={this.props.history}
                    deleteProject={this.props.deleteProject}
                    display={this.state.display}
                />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteProject: projectId => dispatch(deleteProject(projectId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer)
