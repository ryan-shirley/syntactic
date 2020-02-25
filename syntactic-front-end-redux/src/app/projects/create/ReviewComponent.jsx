// React
import React, { Component } from "react"

// Components
import { Row, Col } from "react-bootstrap"
import Error from "../../components/Error"
import DataLoading from "../../components/DataLoading"

class ReviewComponent extends Component {
    render() {
        const { error, singleProject, requestProcessing } = this.props.projects

        return requestProcessing || !singleProject.writer_id ? (
            <DataLoading />
        ) : (
            <Row className="justify-content-md-center mt-5">
                <Col sm={4}>
                    {error && <Error error={error} />}
                    Waiting on response from{" "}
                    {singleProject.writer_id.first_name + ' ' + singleProject.writer_id.last_name}
                </Col>
            </Row>
        )
    }
}

export default ReviewComponent
