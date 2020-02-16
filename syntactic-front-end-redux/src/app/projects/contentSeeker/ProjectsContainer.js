// React
import React, { Component } from "react"
import { Link } from "react-router-dom"

// Redux
import { connect } from "react-redux"

// Components
import ProjectsListContainer from "../ProjectsListComponent"

class ProjectsContainer extends Component {
    render() {
        let projects = this.props.projects.projects

        return (
            <>
                <h1>Projects list</h1>

                <Link to="/projects/create" className="btn btn-primary">
                    New Project
                </Link>

                <ProjectsListContainer projects={projects} loading={this.props.projects.requestProcessing} />
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
