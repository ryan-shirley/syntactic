import React, { Component } from "react"
import { ButtonGroup, Button } from "react-bootstrap"

class ProjectTabsComponent extends Component {
    render() {
        const { role } = this.props
        return (
            <ButtonGroup aria-label="Basic example" className="border-bottom">
                <Button variant="secondary">Overview</Button>
                <Button variant="secondary">Chat</Button>
                {role === 'writer' && <Button variant="secondary">Text Editor</Button>}
            </ButtonGroup>
        )
    }
}

export default ProjectTabsComponent
