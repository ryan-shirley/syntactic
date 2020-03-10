// React
import React, { Component } from "react"

// Components
import { Row, Col, Button } from "react-bootstrap"

// Fonts
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

class ProgressIndicatorComponent extends Component {
    /**
     * onClick() Move to clicked stage
     */
    onClick(stage) {
        this.props.onClick(stage)
    }

    render() {
        let { active, project } = this.props

        return (
            <Row
                className={
                    "justify-content-md-center project-progress-indicators " +
                    active
                }
            >
                <Col className="stage">
                    <Button
                        variant={active === "overview" ? "dark" : "primary"}
                    >
                        {active === "overview" ? (
                            1
                        ) : (
                            <FontAwesomeIcon icon={faCheck} />
                        )}
                    </Button>
                    <span className="name">Overview</span>
                </Col>
                <Col className="stage">
                    <Button
                        variant={
                            active === "resources" ||
                            active === "writer" ||
                            active === "review"
                                ? "primary"
                                : active === "brief"
                                ? "dark"
                                : "outline-dark"
                        }
                        disabled={!project.title}
                        onClick={() => this.onClick("brief")}
                    >
                        {active === "brief" || active === "overview" ? (
                            2
                        ) : (
                            <FontAwesomeIcon icon={faCheck} />
                        )}
                    </Button>
                    <span className="name">Brief</span>
                </Col>
                <Col className="stage">
                    <Button
                        variant={
                            active === "resources" ||
                            active === "writer" ||
                            active === "review"
                                ? "primary"
                                : active === "resources"
                                ? "dark"
                                : "outline-dark"
                        }
                        disabled={!project.brief}
                        onClick={() => this.onClick("resources")}
                    >
                        {active === "resources" ||
                        active === "brief" ||
                        active === "overview" ? (
                            3
                        ) : (
                            <FontAwesomeIcon icon={faCheck} />
                        )}
                    </Button>
                    <span className="name">Resources</span>
                </Col>
                <Col className="stage">
                    <Button
                        variant={
                            active === "review"
                                ? "primary"
                                : active === "writer"
                                ? "dark"
                                : "outline-dark"
                        }
                        disabled={!project.brief}
                        onClick={() => this.onClick("writer")}
                    >
                        {active === "writer" ||
                        active === "brief" ||
                        active === "overview" ||
                        active === "resources" ? (
                            4
                        ) : (
                            <FontAwesomeIcon icon={faCheck} />
                        )}
                    </Button>
                    <span className="name">Writers</span>
                </Col>
                <Col className="stage">
                    <Button
                        variant={active === "review" ? "dark" : "outline-dark"}
                        disabled={!project.writer_id}
                        onClick={() => this.onClick("review")}
                    >
                        {active === "review" ||
                        active === "brief" ||
                        active === "overview" ||
                        active === "resources" ||
                        active === "writer" ? (
                            5
                        ) : (
                            <FontAwesomeIcon icon={faCheck} />
                        )}
                    </Button>
                    <span className="name">Review</span>
                </Col>
            </Row>
        )
    }
}

export default ProgressIndicatorComponent
