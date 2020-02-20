import React, { Component } from "react"
import { Form, Row, Col, Button, Alert } from "react-bootstrap"

class ResourcesComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            resource: null,
        }
    }

    /**
     * onSubmit() Submit form to login
     */
    onSubmit = e => {
        e.preventDefault()
        // this.props.uploadBrief(this.state.brief, this.props.projects.singleProject._id)
    }

    render() {
        let { error } = this.props.projects

        return (
            <Row className="justify-content-md-center mt-5">
                <Col sm={4}>
                    <h3>Upload Resources</h3>
                    <Form onSubmit={this.onSubmit} className="mt-3">
                        {error && (
                            <Alert variant="danger">{error.message}</Alert>
                        )}
                        
                        <Form.Group controlId="hgvFailureNote">
                            <input
                                type="file"
                                className="form-control"
                                onChange={e =>
                                    this.setState({ resource: e.target.files[0] })
                                }
                            />
                        </Form.Group>

                        <Button variant="secondary" className="ml-3" onClick={() => this.props.setCurrentView('writer')}>Skip</Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default ResourcesComponent
