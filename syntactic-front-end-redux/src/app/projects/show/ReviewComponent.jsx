import React, { Component } from "react"
import { Alert, Form, Row, Col, Button, Spinner } from "react-bootstrap"
import { Redirect } from "react-router-dom"

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
        const { error, project, requestProcessing } = this.props

        return (
            <Row className="justify-content-md-center mt-5">
                <Col sm={4}>
                    <h2>Review Project: {project.title}</h2>
                    <p>Due {project.end_date}</p>

                    <h4 className="text-uppercase">Brief</h4>
                    <p>{project.brief.path}</p>
                    
                    <Button variant="success" onClick={() => this.onDecision(true, project)}>Accept</Button>
                    <Button variant="danger" className="ml-3" onClick={() => this.onDecision(false, project)}>Decline</Button>
                </Col>
            </Row>
        )
    }
}

export default ReviewComponent
