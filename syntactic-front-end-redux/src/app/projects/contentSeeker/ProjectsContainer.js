// React
import React, { Component } from "react"
import { Link } from "react-router-dom"

// Redux
import { connect } from "react-redux"

class ProjectsContainer extends Component {
    render() {
        return (
            <>
                <h1>Projects list</h1>

                <Link to="/projects/create" className="btn btn-primary">
                    New Project
                </Link>
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
