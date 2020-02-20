// React
import React, { Component } from "react"
import { Link } from "react-router-dom"

// Components
import { ButtonGroup, Button } from "react-bootstrap"

class ProjectTabsComponent extends Component {
    render() {
        const { role, path } = this.props
        return (
            <ButtonGroup aria-label="Basic example" className="border-bottom">
                <Button variant="secondary" as={Link} to={`${path}/overview`} >Overview</Button>
                <Button variant="secondary" as={Link} to={`${path}/chat`}>Chat</Button>
                {role === 'writer' && <Button variant="secondary" as={Link} to={`${path}/editor`}>Text Editor</Button>}
            </ButtonGroup>
        )
    }
}

export default ProjectTabsComponent
