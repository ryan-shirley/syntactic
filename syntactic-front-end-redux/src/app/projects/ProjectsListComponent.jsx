import React, { Component } from "react"
import { Table } from "react-bootstrap"
import Moment from "react-moment"

class ProjectsListComponent extends Component {
    render() {
        return (
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Due Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.projects && this.props.projects.map(project => (
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
    }
}

export default ProjectsListComponent