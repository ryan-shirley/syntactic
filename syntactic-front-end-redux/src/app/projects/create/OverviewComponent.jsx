import React, { Component } from "react"
import { Alert, Form, Row, Col, Button, Spinner, Card } from "react-bootstrap"
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
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <Card body>
                        <h2>Create Project</h2>
                        <hr />
                        <p>Let’s get your new project started today! Following the next few steps we will match you with some of the best and most relevant writers for you’re project.</p>

                        <Form onSubmit={this.onSubmit} className="mt-5">
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
                                <Form.Text className="text-muted">
                                    Make this short but still descriptive so
                                    everyone will know what this project is
                                    about at a glance.
                                </Form.Text>

                                {error &&
                                    error.fields &&
                                    error.fields.title && (
                                        <span className="badge badge-pill badge-danger">
                                            {error.fields.title.message}
                                        </span>
                                    )}
                            </Form.Group>

                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="formProjectAmount">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="amount"
                                            value={this.state.amount}
                                            onChange={this.handleInputChange}
                                            required
                                        />
                                        <Form.Text className="text-muted">
                                            How much you are willing to pay.
                                        </Form.Text>

                                        {error &&
                                            error.fields &&
                                            error.fields.amount && (
                                                <span className="badge badge-pill badge-danger">
                                                    {
                                                        error.fields.amount
                                                            .message
                                                    }
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formProjectEndDate">
                                        <Form.Label>Due Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="end_date"
                                            value={this.state.end_date}
                                            onChange={this.handleInputChange}
                                            required
                                        />
                                        <Form.Text className="text-muted">
                                            When you need this project completed
                                            by
                                        </Form.Text>

                                        {error &&
                                            error.fields &&
                                            error.fields.end_date && (
                                                <span className="badge badge-pill badge-danger">
                                                    {
                                                        error.fields.end_date
                                                            .message
                                                    }
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                            </Form.Row>

                            <Button type="submit" disabled={requestProcessing}>
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
                                    "Create"
                                )}
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default OverviewComponent
