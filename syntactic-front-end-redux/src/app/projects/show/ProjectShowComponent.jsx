import React, { Component } from "react"
import { Row, Col } from "react-bootstrap"

// Components
import ProjectTabsComponent from "./ProjectTabsComponent"
import ProjectHeadingComponent from "./ProjectHeadingComponent"

class ProjectShowComponent extends Component {
    render() {
        const { project, user, match } = this.props
        let role = user.role[0].name
        let url = match.url
        return (
            <>
                <ProjectHeadingComponent project={project} role={role} />
                <Row className="mb-5">
                    <Col>
                        <ProjectTabsComponent role={role} path={url} />
                    </Col>
                </Row>
            </>
        )
    }
}

export default ProjectShowComponent
