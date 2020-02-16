import React, { Component } from "react"
import { connect } from "react-redux"

class ProjectsContainer extends Component {
    render() {
        let { projects, requestProcessing, error } = this.props.projects

        let message = requestProcessing ? 'Loading projects...' : error ? error : null
        

        return message && <h3>{message}</h3>
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects
    }
}

export default connect(mapStateToProps)(ProjectsContainer)
