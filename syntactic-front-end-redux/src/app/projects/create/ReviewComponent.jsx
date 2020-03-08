// React
import React, { Component } from "react"

// Components
import { Row, Col, Card, Image } from "react-bootstrap"
import Error from "../../components/Error"
import DataLoading from "../../components/DataLoading"
import Moment from "react-moment"

// API Util
import API from "../../../utils/API"

class ReviewComponent extends Component {
    /**
     * downloadFile() Open project file in new tab
     */
    downloadFile(path) {
        API.get(
            `/projects/${this.props.match.params.id}/download?filePath=${path}`
        ).then(url => window.open(url, "_blank"))
    }

    render() {
        const {
            error,
            singleProject: project,
            requestProcessing
        } = this.props.projects

        const writer = project.writer_id
        const { brief, resources } = project

        return requestProcessing || !writer ? (
            <DataLoading />
        ) : (
            <Row className="justify-content-md-center">
                <Col sm={6} className="writer">
                    <Card body>
                        <h2>Invitation Pending</h2>
                        <hr />

                        {error && <Error error={error} />}

                        <h6 className="text-uppercase mb-1 text-reset">
                            <small className="font-weight-bolder">Title</small>
                        </h6>
                        <h3 className="mb-3">{project.title}</h3>

                        <h6 className="text-uppercase mb-3 text-reset">
                            <small className="font-weight-bolder">
                                Brief (1)
                            </small>
                        </h6>
                        <ul className="card-list single">
                            <li
                                className="item"
                                onClick={() => this.downloadFile(brief.path)}
                            >
                                <Card body>
                                    <span className="text-primary">
                                        {brief.path}
                                    </span>
                                </Card>
                            </li>
                        </ul>

                        <h6 className="text-uppercase mb-3 text-reset">
                            <small className="font-weight-bolder">
                                Resources ({resources ? resources.length : 0})
                            </small>
                        </h6>
                        {resources && (
                            <ul
                                className={
                                    "card-list " +
                                    (resources.length === 1
                                        ? "single"
                                        : resources.length === 2
                                        ? "double"
                                        : "multi")
                                }
                            >
                                {resources.map(res => (
                                    <li
                                        className="item"
                                        key={res._id}
                                        onClick={() =>
                                            this.downloadFile(res.path)
                                        }
                                    >
                                        <Card body>
                                            <Row>
                                                <Col>
                                                    <span className="text-primary">
                                                        {res.fileName}
                                                    </span>
                                                </Col>
                                                <Col>
                                                    <Moment
                                                        format="DD MMM YYYY - h:mm a"
                                                        className="body-text-light"
                                                    >
                                                        {res.createdAt}
                                                    </Moment>
                                                </Col>
                                                <Col className="body-text-light">
                                                    {this.bytesToSize(res.size)}
                                                </Col>
                                            </Row>
                                        </Card>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <h6 className="text-uppercase mb-3 text-reset">
                            <small className="font-weight-bolder">Writer</small>
                        </h6>
                        <Row>
                            <Col xs="auto">
                                <Image
                                    src="/img/profile.jpg"
                                    className="profile rounded-circle img-fluid"
                                    width="80"
                                    height="80"
                                    alt={
                                        writer.first_name +
                                        " " +
                                        writer.last_name
                                    }
                                />
                            </Col>
                            <Col>
                                <p className="name">
                                    {writer.first_name + " " + writer.last_name}{" "}
                                    <span className="location">
                                        New York, NY*
                                    </span>
                                </p>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default ReviewComponent
