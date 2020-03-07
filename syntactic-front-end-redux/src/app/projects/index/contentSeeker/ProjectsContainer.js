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

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThLarge, faBars } from "@fortawesome/free-solid-svg-icons"

class ProjectsContainer extends Component {
    /**
     * componentWillMount() Clear projects state
     */
    componentWillUnmount() {
        this.props.clearProjects()
    }
    
    render() {
        let { projects, requestProcessing, error } = this.props.projects
        let requestError

        if (requestProcessing && !error) {
            return <DataLoading />
        } else if (!requestProcessing && error && error.code !== 204) {
            requestError = <Error error={error} />
        }

        return (
            <>
                <Row className="mb-3">
                    <Col xs={12} sm={8}>
                        <h1>All Projects</h1>
                    </Col>
                    <Col xs={12} sm={4} className="text-right">
                        <Button
                            variant="secondary"
                            size="sm"
                            className={
                                "mr-2" +
                                (this.props.projects.projectDisplay === "table"
                                    ? " active"
                                    : "")
                            }
                            onClick={() => this.props.changeProjectLayout("table")}
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            className={
                                "mr-5" +
                                (this.props.projects.projectDisplay === "grid" ? " active" : "")
                            }
                            onClick={() => this.props.changeProjectLayout("grid")}
                        >
                            <FontAwesomeIcon icon={faThLarge} />
                        </Button>

                        <Button as={Link} to="/projects/create">
                            New Project
                        </Button>
                    </Col>
                </Row>

                {requestError}

                <ProjectsListContainer
                    projects={projects}
                    loading={this.props.projects.requestProcessing}
                    history={this.props.history}
                    deleteProject={this.props.deleteProject}
                    display={this.props.projects.projectDisplay}
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
        deleteProject: projectId => dispatch(deleteProject(projectId)),
        changeProjectLayout: newLayout => dispatch({ type: "SWITCH_PROJECT_LAYOUT", payload: newLayout }),
        clearProjects: () => dispatch({ type: "CLEAR_PROJECTS_LIST" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer)
