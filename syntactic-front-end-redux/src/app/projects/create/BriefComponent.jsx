import React, { Component } from "react"
import { Form, Row, Col } from "react-bootstrap"

class BriefComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            brief: "",
        }
    }

    /**
     * onSubmit() Submit form to login
     */
    onSubmit = e => {
        e.preventDefault()
        // this.props.createProject(this.state)
    }

    render() {
        return (
            <Row className="justify-content-md-center mt-5">
                <Col sm={4}>
                    <Form onSubmit={this.onSubmit} className="mt-3">
                        {/* {error && (
                            <Alert variant="danger">{error.message}</Alert>
                        )} */}

                        <p>This is the brief upload component.</p>
                        
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default BriefComponent
