import React, { Component } from "react"
import { Row, Col, Badge } from "react-bootstrap"
import Moment from "react-moment"

// Components
import ProjectTabsComponent from "./ProjectTabsComponent"

class ProjectShowComponent extends Component {
    render() {
        const { project, user } = this.props
        let role = user.role[0].name
        return (
            <>
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
                <Row>
                    <Col>
                        <ProjectTabsComponent role={role} />
                    </Col>
                </Row>
            </>
        )
    }
}

export default ProjectShowComponent
