import React, { Component } from "react"
import { Alert, Form, Row, Col, Button, Spinner } from "react-bootstrap"
import { Redirect } from "react-router-dom"

class OverviewComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            end_date: "",
            amount: ""
        }
    }

    /**
     * handleInputChange() Handle form input from user
     */
    handleInputChange = e => {
        const target = e.target
        const { name, value } = target

        this.setState({
            [name]: value
        })
    }

    /**
     * onSubmit() Submit form to login
     */
    onSubmit = e => {
        e.preventDefault()
        this.props.createProject(this.state)
    }

    render() {
        const { error, singleProject, requestProcessing } = this.props.projects

        if (singleProject.title) {
            return <Redirect to={`/projects/${singleProject._id}/create`} />
        }

        return (
            <Row className="justify-content-md-center mt-5">
                <Col sm={4}>
                    <Form onSubmit={this.onSubmit} className="mt-3">
                        {error && (
                            <Alert variant="danger">{error.message}</Alert>
                        )}

                        <Form.Group controlId="formProjectTitle">
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
                        </Form.Group>

                        <Form.Group controlId="formProjectAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                value={this.state.amount}
                                onChange={this.handleInputChange}
                                required
                            />
                            {error && error.fields && error.fields.amount && (
                                <span className="badge badge-pill badge-danger">
                                    {error.fields.amount.message}
                                </span>
                            )}
                        </Form.Group>

                        <Form.Group controlId="formProjectEndDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="end_date"
                                value={this.state.end_date}
                                onChange={this.handleInputChange}
                                required
                            />
                            {error && error.fields && error.fields.end_date && (
                                <span className="badge badge-pill badge-danger">
                                    {error.fields.end_date.message}
                                </span>
                            )}
                        </Form.Group>

                        <Button type="submit" disabled={requestProcessing}>
                            {requestProcessing
                                ? 
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
                                : "Submit"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default OverviewComponent
