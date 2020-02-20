import React, { Component } from "react"
import { Table } from "react-bootstrap"
import Moment from "react-moment"
import DataLoading from "../../components/DataLoading"

class ProjectsListComponent extends Component {
    constructor(props) {
        super(props)

        // Binding this to work in the callback
        this.onClick = this.onClick.bind(this)
    }

    /**
     * onClick() Send to view project
     */
    onClick = id => {
        this.props.history.push(`/projects/${id}`)
    }

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
                        </tr>
                    </thead>
                    <tbody>
                        {projects &&
                            projects.map(project => (
                                <tr key={project._id} onClick={() => this.onClick(project._id)}>
                                    <td>{project.title}</td>
                                    <td>
                                        <Moment format="DD/MM/YYYY">
                                            {project.end_date}
                                        </Moment>
                                    </td>
                                    <td>{project.status}</td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            )
        }
    }
}

export default ProjectsListComponent
