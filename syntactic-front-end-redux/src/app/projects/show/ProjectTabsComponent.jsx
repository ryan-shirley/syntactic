// React
import React, { Component } from "react"
import { NavLink } from "react-router-dom"

// Components
import { ButtonGroup, Button } from "react-bootstrap"

class ProjectTabsComponent extends Component {
    render() {
        const { role, path, project, pathname } = this.props
        
        return (
            <ButtonGroup aria-label="Basic example" className="project-tabs">
                <Button variant="link" as={NavLink} to={`${path}/overview`} className={!pathname.includes('chat') && !pathname.includes('editor') && !pathname.includes('finish') && 'active'}>Overview</Button>
                <Button variant="link" as={NavLink} to={`${path}/chat`}>Chat</Button>
                {role === 'writer' && <Button variant="link" as={NavLink} to={`${path}/editor`}>Text Editor</Button>}
                {role === 'content seeker' && project.deliverables && project.deliverables.some(deliverable => deliverable.status === 'accepted') && <Button variant="link" as={NavLink} to={`${path}/finish`}>Finish</Button>}
            </ButtonGroup>
        )
    }
}

export default ProjectTabsComponent
