import React, { Component } from "react"
import { Form, Row, Col, Button, Spinner, Alert } from "react-bootstrap"

class BriefComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            brief: null,
        }
    }

    /**
     * onSubmit() Upload brief
     */
    onSubmit = e => {
        e.preventDefault()
        this.props.uploadBrief(this.state.brief, this.props.projects.singleProject._id)
    }

    render() {
        let { requestProcessing, error } = this.props.projects

        return (
            <Row className="justify-content-md-center mt-5">
                <Col sm={4}>
                    <h3>Upload Brief</h3>
                    <Form onSubmit={this.onSubmit} className="mt-3">
                        {error && (
                            <Alert variant="danger">{error.message}</Alert>
                        )}
                        
                        <Form.Group controlId="hgvFailureNote">
                            <input
                                type="file"
                                className="form-control"
                                onChange={e =>
                                    this.setState({ brief: e.target.files[0] })
                                }
                            />
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

export default BriefComponent
