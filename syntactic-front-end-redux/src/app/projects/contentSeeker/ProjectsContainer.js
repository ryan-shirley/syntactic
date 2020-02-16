// React
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"
import Moment from "react-moment"

// Redux
import { connect } from "react-redux"

class ProjectsContainer extends Component {
    render() {
        let projects = this.props.projects.projects

        let projectsTable = (
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Due Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {projects && projects.map(project => (
                        <tr key={project._id}>
                            <td>{project.title}</td>
                            <td><Moment
                                    format="DD/MM/YYYY"
                                >
                                    {project.end_date}
                                </Moment></td>
                            <td>{project.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )

        return (
            <>
                <h1>Projects list</h1>

                <Link to="/projects/create" className="btn btn-primary">
                    New Project
                </Link>

                {projectsTable}
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
