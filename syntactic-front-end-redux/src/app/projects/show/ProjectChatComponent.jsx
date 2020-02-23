// React
import React, { Component } from "react"
import openSocket from "socket.io-client"

// Components
import { Alert, Form, Row, Col, Button, Spinner } from "react-bootstrap"

// Socket
const socket = openSocket("http://localhost:8000")

class ProjectChatComponent extends Component {
    constructor() {
        super()

        this.state = {
            messages: [],
            input: "",
            typing: ""
        }

        this.sendSocketIO = this.sendSocketIO.bind(this)
    }

    /**
     * handleInputChange() Handle form input from user
     */
    handleInputChange = e => {
        const target = e.target
        const { name, value } = target

        this.setState({
            [name]: value
        })

        socket.emit("typing", "Noah Smyth")
    }

    /**
     * componentDidMount() Handle socket events
     */
    componentDidMount() {
        // Listen for chat message to be sent
        socket.on("chat", data => {
            let messages = this.state.messages.concat(data)
            this.setState({ messages, typing: "" })
        })

        // Listen for typing events
        socket.on("typing", name => {
            this.setState({ typing: name })
        })
    }

    /**
     * sendSocketIO() Send message using sockets
     */
    sendSocketIO = e => {
        e.preventDefault()

        socket.emit("chat", {
            message: this.state.input,
            handle: "Noah Smyth"
        })
    }

    render() {
        return (
            <>
                <h3>This is the project chat component</h3>
                <hr />
                {this.state.messages &&
                    this.state.messages.map(message => (
                        <p key={message}>
                            {message.sender} says {message.message}
                        </p>
                    ))}
                {this.state.typing &&
                    `${this.state.typing} is typing a message...`}
                <hr />
                <Form onSubmit={this.sendSocketIO} className="mt-3">
                    <Form.Group controlId="formProjectTitle">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            type="text"
                            name="input"
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>

                    <Button type="submit">Send</Button>
                </Form>
            </>
        )
    }
}

export default ProjectChatComponent
