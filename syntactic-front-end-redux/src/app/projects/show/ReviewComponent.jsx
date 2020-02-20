import React, { Component } from "react"
import { Alert, Form, Row, Col, Button, Spinner } from "react-bootstrap"

import ProjectHeadingComponent from "./ProjectHeadingComponent"

class ReviewComponent extends Component {
    /**
     * onDecision() Accept or deline project
     */
    onDecision = (decision, project) => {
        this.props.updateWriterDecision(decision, project)

        // If Declined send to projects list
        if(!decision) {
            this.props.history.replace('/projects')
        }
    }

    render() {
        const { error, project, user, requestProcessing } = this.props
        let role = user.role[0].name

        return (
            <>
                <ProjectHeadingComponent project={project} role={role} />
                <Row className="justify-content-md-center mt-5">
                    <Col sm={4}>
                        <h3>Project Decision</h3>
                        <Button variant="success" onClick={() => this.onDecision(true, project)}>Accept</Button>
                        <Button variant="danger" className="ml-3" onClick={() => this.onDecision(false, project)}>Decline</Button>
                    </Col>
                </Row>
            </>
        )
    }
}

export default ReviewComponent
