// React
import React, { Component } from "react"

// Components
import { Form, Row, Col, Button, Alert, Spinner } from "react-bootstrap"
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
        this.props.uploadResources(this.state.resources, this.props.projects.singleProject._id)
    }

    render() {
        let { error, requestProcessing } = this.props.projects

        return (
            <Row className="justify-content-md-center mt-5">
                <Col sm={4}>
                    <h3>Upload Resources</h3>
                    <Form onSubmit={this.onSubmit} className="mt-3">
                        {error && (
                            <Alert variant="danger">{error.message}</Alert>
                        )}

                        <Form.Group controlId="projectResourcesUpload">
                            <Dropzone
                                onDrop={acceptedFiles => this.addResources(acceptedFiles)}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <section className="multi-file-uploader">
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <p>
                                                Drag 'n' drop some files here,
                                                or click to select files
                                            </p>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </Form.Group>

                        <Button
                            variant="secondary"
                            className="ml-3"
                            onClick={() => this.props.setCurrentView("writer")}
                        >
                            Skip
                        </Button>

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

export default ResourcesComponent
