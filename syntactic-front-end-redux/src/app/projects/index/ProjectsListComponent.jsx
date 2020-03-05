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
import DataLoading from "../../components/DataLoading"
import { Link } from "react-router-dom"

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"

class ProjectsListComponent extends Component {
    render() {
        let { projects, loading, isWriter = false } = this.props

        if (!projects.length || loading) {
            return <DataLoading />
        } else {
            return (
                projects && (
                    <Row className="project-list">
                        {projects.map(project => (
                            <Col
                                sm={4}
                                md={3}
                                key={project._id}
                                className="project"
                            >
                                <Card>
                                    <Card.Body>
                                        <Card.Title
                                            as={Link}
                                            className="h6 d-block"
                                            to={"/projects/" + project._id}
                                        >
                                            {project.title}
                                        </Card.Title>
                                        <Badge
                                            variant="warning"
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
                                        <li>
                                            <Card.Link
                                                as={Link}
                                                to={`/projects/${project._id}/chat`}
                                            >
                                                Chat
                                            </Card.Link>
                                        </li>
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
                                                                this.props.deleteProject(
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
                )
            )
        }
    }
}

export default ProjectsListComponent
