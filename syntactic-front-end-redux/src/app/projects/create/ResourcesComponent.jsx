// React
import React, { Component } from "react"

// Components
import { Form, Row, Col, Button, Alert, Spinner, Card } from "react-bootstrap"
import Dropzone from "react-dropzone"

class ResourcesComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            resources: []
        }
    }

    /**
     * addResources() Add resources to local array ready for upload
     */
    addResources = resources => {
        let newResources = this.state.resources.concat(resources)

        this.setState({
            resources: newResources
        })
    }

    /**
     * onSubmit() Submit form to login
     */
    onSubmit = e => {
        e.preventDefault()
        this.props.uploadResources(
            this.state.resources,
            this.props.projects.singleProject._id
        )
    }

    render() {
        let { error, requestProcessing } = this.props.projects

        return (
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <Card body>
                        <h2>Upload Resources</h2>
                        <hr />
                        <p>
                            Upload any supporting resources for this project.
                            These colour be relevant fact sheets, images or
                            other documents that could be beneficial for the
                            writer.
                        </p>

                        <Form onSubmit={this.onSubmit} className="mt-5">
                            {error && (
                                <Alert variant="danger">{error.message}</Alert>
                            )}

                            <Form.Group controlId="projectResourcesUpload">
                                <Dropzone
                                    onDrop={acceptedFiles =>
                                        this.addResources(acceptedFiles)
                                    }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <section className="multi-file-uploader">
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <p>
                                                    Drag 'n' drop some files
                                                    here, or click to select
                                                    files
                                                </p>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Button
                                        type="submit"
                                        disabled={requestProcessing}
                                    >
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
                                </Col>
                                <Col>
                                    <Button
                                        variant="secondary"
                                        className="float-right"
                                        onClick={() =>
                                            this.props.setCurrentView("writer")
                                        }
                                    >
                                        Skip
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default ResourcesComponent
