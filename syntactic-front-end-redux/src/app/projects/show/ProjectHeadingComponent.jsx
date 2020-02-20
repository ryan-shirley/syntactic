// React
import React, { Component } from "react"

// Components
import Moment from "react-moment"
import { Row, Col, Badge } from "react-bootstrap"

class ProjectHeadingComponent extends Component {
    render() {
        let { project, role } = this.props

        return (
            <Row>
                <Col>
                    <h1>
                        {project.title}{" "}
                        <Badge
                            variant="secondary"
                            className="h6 text-uppercase"
                        >
                            Due:{" "}
                            <Moment format="DD MMM YYYY">
                                {project.end_date}
                            </Moment>
                        </Badge>
                    </h1>
                    <p>
                        {role !== "writer"
                            ? "writer name*"
                            : "content seeker name*"}
                    </p>
                </Col>
                <Col className="text-right">
                    <Badge variant="warning" className="h3 text-uppercase">
                        {project.status}
                    </Badge>
                </Col>
            </Row>
        )
    }
}

export default ProjectHeadingComponent
