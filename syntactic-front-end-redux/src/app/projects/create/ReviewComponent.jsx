import React, { Component } from "react"
import { Alert, Form, Row, Col } from "react-bootstrap"

class ReviewComponent extends Component {
    render() {
        const { error, singleProject, requestProcessing } = this.props.projects

        return (
            <Row className="justify-content-md-center mt-5">
                <Col sm={4}>
                    {error && <Alert variant="danger">{error.message}</Alert>}
                    Waiting on response from {singleProject.writer_id}
                </Col>
            </Row>
        )
    }
}

export default ReviewComponent
