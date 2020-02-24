// React
import React, { Component } from "react"

// Redux
import { connect } from "react-redux"

// Components
import { Card } from "react-bootstrap"

// API Util
import API from "../../../utils/API"

class ProjectOverviewComponent extends Component {
    /**
     * downloadFile() Open project file in new tab
     */
    downloadFile(path) {
        API.get(
            `/projects/${this.props.project._id}/download?filePath=${path}`
        ).then(url => window.open(url, "_blank"))
    }

    render() {
        let { project, requestProcessing } = this.props
        let { brief, deliverables } = project

        if (!project.title || requestProcessing) {
            return <p>Loading...</p>
        } else {
            return (
                <>
                    {deliverables && (
                        <>
                            <h6 className="text-uppercase">
                                Deliverables ({deliverables.length})
                            </h6>
                            {deliverables.map(item => (
                                <Card body key={item._id}>
                                    <span
                                        className="text-primary"
                                        // onClick={() => this.downloadFile(brief.path)}
                                    >
                                        {item.title}
                                    </span>
                                </Card>
                            ))}
                            <hr />
                        </>
                    )}


                    <h6 className="text-uppercase">Brief (1)</h6>
                    <Card body>
                        <span
                            className="text-primary"
                            onClick={() => this.downloadFile(brief.path)}
                        >
                            {brief.path}
                        </span>
                    </Card>
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
        // getProject: id => dispatch(getProject(id)),
    }
}

// Export
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectOverviewComponent)
