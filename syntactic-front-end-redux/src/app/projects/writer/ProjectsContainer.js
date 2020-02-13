import React, { Component } from "react"
import { connect } from "react-redux"

class ProjectsContainer extends Component {
    render() {
        return <div>This is content for the writer</div>
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.profile
    }
}

export default connect(mapStateToProps)(ProjectsContainer)
