import React, { Component } from "react"
import { Row, Col } from "react-bootstrap"

// Components
import ProjectTabsComponent from "./ProjectTabsComponent"
import ProjectHeadingComponent from "./ProjectHeadingComponent"

class ProjectShowComponent extends Component {
    render() {
        const { project, user, match, location } = this.props
        let role = user.role[0].name
        let url = match.url
        let pathname = location.pathname
        return (
            <>
                <ProjectHeadingComponent project={project} role={role} />
                <Row className="justify-content-md-center mt-5">
                    <Col md={10} lg={8}>
                        <ProjectTabsComponent
                            role={role}
                            path={url}
                            pathname={pathname}
                            project={project}
                        />
                    </Col>
                </Row>
            </>
        )
    }
}

export default ProjectShowComponent
