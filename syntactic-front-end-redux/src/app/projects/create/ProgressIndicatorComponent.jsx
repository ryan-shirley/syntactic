// React
import React, { Component } from "react"

// Components
import { Row, Col, Button } from "react-bootstrap"

class ProgressIndicatorComponent extends Component {
    render() {
        let { active, project } = this.props

        return (
            <>
                <Row className="justify-content-md-center mt-5">
                    <Col>
                        <Button
                            variant={
                                active === "" || active === "overview"
                                    ? "primary"
                                    : "secondary"
                            }
                            block
                        >
                            Title
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant={
                                active === "brief" ? "primary" : "secondary"
                            }
                            disabled={!project.title}
                            block
                        >
                            Brief
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant={
                                active === "resources" ? "primary" : "secondary"
                            }
                            disabled={!project.brief}
                            block
                        >
                            Resources
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant={
                                active === "writer" ? "primary" : "secondary"
                            }
                            block
                            disabled={!project.brief}
                        >
                            Writers
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant={
                                active === "review" ? "primary" : "secondary"
                            }
                            block
                            disabled
                        >
                            Review
                        </Button>
                    </Col>
                </Row>
                <hr />
            </>
        )
    }
}

export default ProgressIndicatorComponent
