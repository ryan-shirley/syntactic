// React
import React, { Component } from "react"

// Components
import DataTable from "react-data-table-component"
import { Badge, DropdownButton, Dropdown } from "react-bootstrap"
import Moment from "react-moment"
import { Link } from "react-router-dom"

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"

class ProjectsListTable extends Component {
    render() {
        let { projects, isWriter } = this.props

        // Table Columns
        let columns = [
            {
                name: "Title",
                selector: "title",
                sortable: true,
                cell: row => (
                    <Link to={"/projects/" + row._id}>{row.title}</Link>
                )
            },
            {
                name: isWriter ? "Client" : "Writer",
                cell: project => (
                    <span className="body-text-light">
                        {project.content_seeker_id && isWriter
                            ? project.content_seeker_id.first_name +
                              " " +
                              project.content_seeker_id.last_name
                            : project.writer_id
                            ? project.writer_id.first_name +
                              " " +
                              project.writer_id.last_name
                            : "-"}
                    </span>
                ),
                sortable: true
            },
            {
                name: "Price",
                selector: "amount",
                maxWidth: "150px",
                sortable: true,
                cell: row => (
                    <span className="body-text-light">{`€${row.amount}`}</span>
                )
            },
            {
                name: "Due Date",
                selector: "end_date",
                maxWidth: "250px",
                sortable: true,
                cell: row => (
                    <Badge
                        variant="secondary"
                        className="h6 text-uppercase due-date"
                    >
                        <Moment format="DD MMM YYYY">{row.end_date}</Moment>
                    </Badge>
                )
            },
            {
                name: "Status",
                selector: "status",
                maxWidth: "250px",
                sortable: true,
                cell: row => (
                    <Badge
                        variant={
                            row.status === "completed"
                                ? "success"
                                : row.status === "draft"
                                ? "warning"
                                : "primary"
                        }
                        className="h6 mb-0 text-uppercase status"
                    >
                        {row.status}
                    </Badge>
                )
            },
            {
                cell: project => (
                    <DropdownButton
                        id="project-dropdown-details"
                        title={<FontAwesomeIcon icon={faEllipsisV} />}
                        size="sm"
                        variant="outline-secondary"
                        alignRight
                    >
                        <Dropdown.Item
                            as={Link}
                            to={"/projects/" + project._id}
                        >
                            View Project
                        </Dropdown.Item>
                        {!isWriter && project.status === "draft" && (
                            <Dropdown.Item
                                onClick={() =>
                                    this.props.deleteProject(project._id)
                                }
                            >
                                Delete Project
                            </Dropdown.Item>
                        )}
                        {project.status !== "draft" && (
                            <Dropdown.Item
                                as={Link}
                                to={`/projects/${project._id}/chat`}
                            >
                                Chat
                            </Dropdown.Item>
                        )}
                        {isWriter && (
                            <Dropdown.Item
                                as={Link}
                                to={`/projects/${project._id}/editor`}
                            >
                                Text Editor
                            </Dropdown.Item>
                        )}
                    </DropdownButton>
                ),
                maxWidth: "20px"
            }
        ]

        return (
            <DataTable
                className="datatable"
                columns={columns}
                data={projects}
                defaultSortField="createdAt"
                defaultSortAsc={false}
                keyField="_id"
                pagination={true}
                noHeader={true}
            />
        )
    }
}

export default ProjectsListTable
