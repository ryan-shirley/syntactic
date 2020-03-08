import React, { Component } from "react"
import { Form, Row, Col, Button, Spinner, Alert, Card } from "react-bootstrap"

class BriefComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            brief: null
        }
    }

    /**
     * onSubmit() Upload brief
     */
    onSubmit = e => {
        e.preventDefault()
        this.props.uploadBrief(
            this.state.brief,
            this.props.projects.singleProject._id
        )
    }

    render() {
        let { requestProcessing, error } = this.props.projects

        return (
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <Card body>
                        <h2>Upload Brief</h2>
                        <hr />
                        <p>
                            Upload you’re brief to this project. Please include
                            detailed information that you require as this brief
                            is what is used to match your project with writers.
                        </p>

                        <Form onSubmit={this.onSubmit} className="mt-5">
                            {error && (
                                <Alert variant="danger">{error.message}</Alert>
                            )}

                            <Form.Group controlId="projectBriefUpload">
                                <input
                                    type="file"
                                    onChange={e =>
                                        this.setState({
                                            brief: e.target.files[0]
                                        })
                                    }
                                />
                            </Form.Group>

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
                                        Uploading...
                                    </>
                                ) : (
                                    "Upload"
                                )}
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default BriefComponent
