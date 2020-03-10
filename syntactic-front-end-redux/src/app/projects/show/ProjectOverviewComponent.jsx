// React
import React, { Component } from "react"

// Redux
import { connect } from "react-redux"

// Components
import { Card, Row, Col } from "react-bootstrap"
import DeliverablesList from "./DeliverablesList"
import Moment from "react-moment"

// API Util
import API from "../../../utils/API"

// Actions
import { updateDeliverable } from "../../../store/actions/projectsActions"

class ProjectOverviewComponent extends Component {
    /**
     * downloadFile() Open project file in new tab
     */
    downloadFile(path) {
        API.get(
            `/projects/${this.props.project._id}/download?filePath=${path}`
        ).then(url => window.open(url, "_blank"))
    }

    /**
     * bytesToSize() Return file size in a better format
     */
    bytesToSize(bytes) {
        var sizes = ["Bytes", "KB", "MB", "GB", "TB"]
        if (bytes === 0) return "0 Byte"
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
        return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i]
    }

    render() {
        let { project, requestProcessing } = this.props
        let { brief, deliverables, resources } = project

        if (!project.title || requestProcessing) {
            return <p>Loading...</p>
        } else {
            return (
                <>
                    <DeliverablesList
                        deliverables={deliverables}
                        updateDeliverable={deliverable =>
                            this.props.updateDeliverable(deliverable, project)
                        }
                    />

                    <h6 className="text-uppercase mb-3 text-reset">
                        <small className="font-weight-bolder">Brief (1)</small>
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
                                    onClick={() => this.downloadFile(res.path)}
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
                </>
            )
        }
    }
}

// Mapping
const mapStateToProps = state => {
    return {
        project: state.projects.singleProject
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateDeliverable: (deliverable, project) =>
            dispatch(updateDeliverable(deliverable, project))
    }
}

// Export
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectOverviewComponent)
