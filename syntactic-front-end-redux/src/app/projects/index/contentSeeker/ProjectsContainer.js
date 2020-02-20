// React
import React, { Component } from "react"
import { Link } from "react-router-dom"

// Redux
import { connect } from "react-redux"

// Components
import ProjectsListContainer from "../ProjectsListComponent"
import DataLoading from "../../../components/DataLoading"
import Error from "../../../components/Error"
import { Row, Col } from "react-bootstrap"

class ProjectsContainer extends Component {
    render() {
        let { projects, requestProcessing, error } = this.props.projects

        if(!projects.length && requestProcessing && !error) {
            return <DataLoading />
        } else if (!requestProcessing && error) {
            return <Error error={error} />
        }

        return (
            <>
                <Row>
                    <Col>
                        <h1>Projects list</h1>
                    </Col>
                    <Col className="text-right">
                        <Link to="/projects/create" className="btn btn-primary">
                            New Project
                        </Link>
                    </Col>
                </Row>

                <ProjectsListContainer
                    projects={projects}
                    loading={this.props.projects.requestProcessing}
                    history={this.props.history}
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

export default connect(mapStateToProps)(ProjectsContainer)
