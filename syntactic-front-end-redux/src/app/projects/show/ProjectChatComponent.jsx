// React
import React, { Component } from "react"

// Components
import { Form, Button } from "react-bootstrap"

// Redux
import { connect } from "react-redux"

// Socket
import openSocket from "socket.io-client"

class ProjectChatComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            input: "",
            typing: "",
            socket: openSocket(
                process.env.REACT_APP_BACKEND_API + "/project-" + props.match.params.id
            )
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

        let userFullName =
            this.props.user.first_name + " " + this.props.user.last_name
        this.state.socket.emit("typing", userFullName)
    }

    /**
     * componentDidMount() Handle socket events
     */
    componentDidMount() {
        // Listen for chat message to be sent
        this.state.socket.on("chat", data => {
            console.log("Got a chat message")

            let messages = this.state.messages.concat(data)
            this.setState({ messages, typing: "" })
        })

        // Listen for typing events
        this.state.socket.on("typing", name => {
            this.setState({ typing: name })
        })
    }

    /**
     * sendSocketIO() Send message using sockets
     */
    sendSocketIO = e => {
        e.preventDefault()
        let userFullName =
            this.props.user.first_name + " " + this.props.user.last_name

        let message = {
            message: this.state.input,
            sender: userFullName
        }

        // Send message with socket
        this.state.socket.emit("chat", message)

        // Append message to local list and reset
        let messages = this.state.messages.concat(message)
        this.setState({ messages, typing: "", input: "" })
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
                {this.state.typing && (
                    <span className="text-muted">{`${this.state.typing} is typing a message...`}</span>
                )}
                <hr />
                <Form onSubmit={this.sendSocketIO} className="mt-3">
                    <Form.Group controlId="formProjectTitle">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            type="text"
                            name="input"
                            value={this.state.input}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>

                    <Button type="submit">Send</Button>
                </Form>
            </>
        )
    }
}

// Mapping
const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

// Export
export default connect(mapStateToProps)(ProjectChatComponent)
