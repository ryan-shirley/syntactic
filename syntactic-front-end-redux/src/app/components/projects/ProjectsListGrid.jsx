// React
import React, { Component } from "react"

// Components
import {
    Row,
    Col,
    Card,
    Badge,
    DropdownButton,
    Dropdown
} from "react-bootstrap"
import Moment from "react-moment"
import { Link } from "react-router-dom"

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"

class ProjectsListGrid extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projects: props.projects,
            sortBy: "created"
        }
    }

    /**
     * sortProjects() Sort projects
     */
    sortProjects(sortOrder) {
        let newOrder,
            projects = this.state.projects

        if (sortOrder) {
            if (sortOrder === "created") {
                newOrder = projects.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                )
            }
            if (sortOrder === "dueDate") {
                newOrder = projects.sort(
                    (a, b) => new Date(a.end_date) - new Date(b.end_date)
                )
            }
            if (sortOrder === "amount") {
                newOrder = projects.sort((a, b) => b.amount - a.amount)
            }
        }

        this.setState({ sortBy: sortOrder, projects: newOrder })
    }

    /**
     * deleteProject() Delete project
     */
    deleteProject(id) {
        this.props.deleteProject(id)

        // Remove from local list
        let filtered = this.state.projects.filter(project => project._id !== id)
        this.setState({ projects: filtered })
    }

    render() {
        let projects = this.state.projects
        let { isWriter } = this.props

        return (
            projects && (
                <>
                    <Row className="project-filters">
                        <Col>
                            <label>Sort by</label>
                            <select
                                className="form-select ml-2"
                                id="sortby"
                                value={this.state.sortBy}
                                onChange={event =>
                                    this.sortProjects(event.target.value)
                                }
                            >
                                <option value="created">Created</option>
                                <option value="dueDate">Due Date</option>
                                <option value="amount">Cost</option>
                            </select>
                        </Col>
                    </Row>

                    <Row className="project-list">
                        {projects.map(project => (
                            <Col
                                sm={4}
                                lg={3}
                                key={project._id}
                                className="project"
                            >
                                <Card>
                                    <Card.Body>
                                        <Card.Title
                                            as={Link}
                                            className="h6 d-block text-decoration-none"
                                            to={"/projects/" + project._id}
                                        >
                                            {project.title + " "}
                                            <span className="body-text-light price float-right">
                                                €{project.amount}
                                            </span>
                                        </Card.Title>
                                        <Badge
                                            variant={
                                                project.status === "completed"
                                                    ? "success"
                                                    : project.status === "draft"
                                                    ? "warning"
                                                    : "primary"
                                            }
                                            className="h6 text-uppercase status"
                                        >
                                            {project.status}
                                        </Badge>
                                        <Badge
                                            variant="secondary"
                                            className="h6 text-uppercase due-date"
                                        >
                                            <strong className="mr-2">
                                                Due:
                                            </strong>
                                            <Moment format="DD MMM YYYY">
                                                {project.end_date}
                                            </Moment>
                                        </Badge>
                                    </Card.Body>
                                    <hr />
                                    <ul>
                                        {isWriter && (
                                            <li>
                                                <Card.Link
                                                    as={Link}
                                                    to={`/projects/${project._id}/editor`}
                                                >
                                                    Text Editor
                                                </Card.Link>
                                            </li>
                                        )}
                                        {project.status !== "draft" && (
                                            <li>
                                                <Card.Link
                                                    as={Link}
                                                    to={`/projects/${project._id}/chat`}
                                                >
                                                    Chat
                                                </Card.Link>
                                            </li>
                                        )}
                                        {!isWriter && (
                                            <li>
                                                <DropdownButton
                                                    id="project-dropdown-details"
                                                    title={
                                                        <FontAwesomeIcon
                                                            icon={faEllipsisV}
                                                        />
                                                    }
                                                    size="sm"
                                                    variant="outline-secondary"
                                                    alignRight
                                                >
                                                    <Dropdown.Item
                                                        as={Link}
                                                        to={
                                                            "/projects/" +
                                                            project._id
                                                        }
                                                    >
                                                        View Project
                                                    </Dropdown.Item>
                                                    {project.status ===
                                                        "draft" && (
                                                        <Dropdown.Item
                                                            onClick={() =>
                                                                this.deleteProject(
                                                                    project._id
                                                                )
                                                            }
                                                        >
                                                            Delete Project
                                                        </Dropdown.Item>
                                                    )}
                                                </DropdownButton>
                                            </li>
                                        )}
                                    </ul>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </>
            )
        )
    }
}

export default ProjectsListGrid
