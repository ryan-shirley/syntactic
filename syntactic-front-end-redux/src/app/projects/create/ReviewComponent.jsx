// React
import React, { Component } from "react"

// Components
import { Row, Col } from "react-bootstrap"
import Error from "../../components/Error"

class ReviewComponent extends Component {
    render() {
        const { error, singleProject } = this.props.projects

        return (
            <Row className="justify-content-md-center mt-5">
                <Col sm={4}>
                    {error && <Error error={error} />}
                    Waiting on response from {singleProject.writer_id}
                </Col>
            </Row>
        )
    }
}

export default ReviewComponent
