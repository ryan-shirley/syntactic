// React
import React, { Component } from "react"
import { Redirect } from "react-router-dom"

// Redux
import { connect } from "react-redux"

class ProjectTextEditorComponent extends Component {
    render() {
        if (this.props.role == "content seeker" && this.props.project._id) {
            return <Redirect push to={`/projects/${this.props.project._id}`} />
        }

        return <h3>This is the project text editor</h3>
    }
}

// Mapping
const mapStateToProps = state => {
    return {
        role: state.auth.user.role[0].name,
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
)(ProjectTextEditorComponent)
