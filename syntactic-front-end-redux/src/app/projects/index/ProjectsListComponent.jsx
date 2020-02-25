// React
import React, { Component } from "react"

// Components
import { Table, Button } from "react-bootstrap"
import Moment from "react-moment"
import DataLoading from "../../components/DataLoading"
import { Link } from "react-router-dom"

class ProjectsListComponent extends Component {
    render() {
        let { projects, loading } = this.props

        if (!projects.length || loading) {
            return <DataLoading />
        } else {
            return (
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects &&
                            projects.map(project => (
                                <tr key={project._id}>
                                    <td>
                                        <Link to={"/projects/" + project._id}>
                                            {project.title}
                                        </Link>
                                    </td>
                                    <td>
                                        <Moment format="DD/MM/YYYY">
                                            {project.end_date}
                                        </Moment>
                                    </td>
                                    <td>{project.status}</td>
                                    <td>
                                        {project.status === "draft" && (
                                            <Button
                                                variant="danger"
                                                onClick={() =>
                                                    this.props.deleteProject(
                                                        project._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            )
        }
    }
}

export default ProjectsListComponent
