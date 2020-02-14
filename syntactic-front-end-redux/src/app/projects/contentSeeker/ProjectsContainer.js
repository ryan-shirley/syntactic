// React
import React, { Component } from "react"

// Redux
import { connect } from "react-redux"

class ProjectsContainer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <h1>Projects list</h1>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects
    }
}

export default connect(mapStateToProps)(ProjectsContainer)
