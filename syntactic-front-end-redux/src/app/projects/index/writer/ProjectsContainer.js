import React, { Component } from "react"
import { connect } from "react-redux"
import { Alert } from "react-bootstrap"

// Components
import ProjectsListContainer from "../ProjectsListComponent"
import { Row, Col, Button } from "react-bootstrap"
import DataLoading from "../../../components/DataLoading"

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

        let projectList = requestProcessing ? (
            <DataLoading />
        ) : (
            <ProjectsListContainer
                projects={projects}
                loading={requestProcessing}
                history={this.props.history}
                isWriter={true}
                display={this.props.projects.projectDisplay}
            />
        )

        return (
            <>
            <Row className="mb-3">
                    <Col xs={8}>
                        <h1>All Projects</h1>
                    </Col>
                    <Col xs={4} className="text-right">
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
                            className={this.props.projects.projectDisplay === "grid" ? " active" : ""}
                            onClick={() => this.props.changeProjectLayout("grid")}
                        >
                            <FontAwesomeIcon icon={faThLarge} />
                        </Button>
                    </Col>
                </Row>

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


const mapDispatchToProps = dispatch => {
    return {
        changeProjectLayout: newLayout => dispatch({ type: "SWITCH_PROJECT_LAYOUT", payload: newLayout }),
        clearProjects: () => dispatch({ type: "CLEAR_PROJECTS_LIST" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer)
