import React, { Component } from "react"
import { Alert, Form, Row, Col, Button, Spinner } from "react-bootstrap"
import { Redirect } from "react-router-dom"

class ReviewComponent extends Component {
    /**
     * onSubmit() Submit form to login
     */
    // onSubmit = e => {
    //     e.preventDefault()
    //     this.props.createProject(this.state)
    // }

    render() {
        const { error, singleProject, requestProcessing } = this.props.projects

        return (
            <Row className="justify-content-md-center mt-5">
                <Col sm={4}>
                    <h2>Review Component</h2>
                    <Form onSubmit={this.onSubmit} className="mt-3">
                        {error && (
                            <Alert variant="danger">{error.message}</Alert>
                        )}

                        {/* <Form.Group controlId="formProjectTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                required
                            />
                            {error && error.fields && error.fields.title && (
                                <span className="badge badge-pill badge-danger">
                                    {error.fields.title.message}
                                </span>
                            )}
                        </Form.Group> */}

                        {/* <Button type="submit" disabled={requestProcessing}>
                            {requestProcessing ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="mr-3"
                                    />
                                    Processing...
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button> */}
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default ReviewComponent
