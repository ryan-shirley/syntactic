// React
import React, { Component } from "react"

// Components
import Moment from "react-moment"
import { Row, Col, Badge, Image } from "react-bootstrap"

class ProjectHeadingComponent extends Component {
    render() {
        let { project, role } = this.props

        let name =
            project.writer_id && role !== "writer"
                ? project.writer_id.first_name +
                  " " +
                  project.writer_id.last_name
                : project.content_seeker_id &&
                  project.content_seeker_id.first_name +
                      " " +
                      project.content_seeker_id.last_name

        return (
            <>
                <Row className="justify-content-md-center project-heading">
                    <Col md={10} lg={8}>
                        <Row>
                            <Col xs={7}>
                                <h1>{project.title}</h1>
                            </Col>
                            <Col xs={5} className="text-right">
                                <Badge
                                    variant={
                                        project.status === "completed"
                                            ? "success"
                                            : project.status === "draft"
                                            ? "warning"
                                            : "primary"
                                    }
                                    className="status"
                                >
                                    {project.status}
                                </Badge>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="justify-content-md-center project-bar">
                    <Col md={10} lg={8}>
                        <Row>
                            <Col>
                                <Badge
                                    variant="secondary"
                                    className="h6 text-uppercase"
                                >
                                    <strong className="mr-2">Due:</strong>
                                    <Moment format="DD MMM YYYY">
                                        {project.end_date}
                                    </Moment>
                                </Badge>
                            </Col>
                            <Col className="text-right user">
                                <Image
                                    src="/img/profile.jpg"
                                    className="rounded-circle profile"
                                    alt={name}
                                />{" "}
                                {name}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }
}

export default ProjectHeadingComponent
