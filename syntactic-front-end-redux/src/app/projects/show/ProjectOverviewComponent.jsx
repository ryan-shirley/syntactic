// React
import React, { Component } from "react"

// Redux
import { connect } from "react-redux"

// Components
import { Card } from "react-bootstrap"

class ProjectOverviewComponent extends Component {
    render() {
        let { project, requestProcessing } = this.props
        let { brief } = project

        if (!project.title || requestProcessing) {
            return <p>Loading...</p>
        } else {
            return (
                <>
                    <h6 className="text-uppercase">Brief (1)</h6>
                    <Card body>{brief.path}</Card>
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
