// React
import React, { Component } from "react"

// Components
import { Form, Button, Badge } from "react-bootstrap"

// Redux
import { connect } from "react-redux"

// Socket
import openSocket from "socket.io-client"

// API
import API from "../../../utils/API"

class ProjectChatComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            input: "",
            typing: "",
            socket: openSocket(
                process.env.REACT_APP_BACKEND_API +
                    "/project-" +
                    props.match.params.id
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
     * componentWillMount() Load old messages
     */
    async componentWillMount() {
        // Get Messages
        let messagesList = await API.get(
            `/projects/${this.props.match.params.id}/messages`
        )

        this.setState({
            messages: messagesList
        })
    }

    /**
     * componentDidMount() Handle socket events
     */
    componentDidMount() {
        // Listen for chat message to be sent
        this.state.socket.on("chat", data => {
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

        let message = {
            sender_id: {
                _id: this.props.user._id,
                first_name: this.props.user.first_name,
                last_name: this.props.user.last_name
            },
            receiver_id: {
                _id:
                    this.props.project.content_seeker_id === this.props.user._id
                        ? this.props.project.writer_id
                        : this.props.project.content_seeker_id
            },
            message: this.state.input,
            project_id: this.props.match.params.id
        }

        // Send message with socket
        this.state.socket.emit("chat", message)

        // Append message to local list and reset
        message._id = Date.now()
        let messages = this.state.messages.concat(message)
        this.setState({ messages, typing: "", input: "" })
    }

    render() {
        return (
            <>
                <h3>This is the project chat component</h3>
                <hr />
                <div className="chat-list">
                    {this.state.messages &&
                        this.state.messages.map(message => (
                            <div
                                className={
                                    "message mb-3" +
                                    (message.sender_id._id ===
                                        this.props.user._id ? " text-right" : "")
                                }
                                key={message._id}
                            >
                                <span>
                                    {message.sender_id._id ===
                                    this.props.user._id
                                        ? this.props.user.first_name +
                                          " " +
                                          this.props.user.last_name
                                        : message.sender_id.first_name +
                                          " " +
                                          message.sender_id.last_name}
                                </span>
                                <br />
                                <Badge
                                    key={message._id}
                                    variant={
                                        message.sender_id._id ===
                                        this.props.user._id
                                            ? "primary"
                                            : "secondary"
                                    }
                                >
                                    {message.message}
                                </Badge>
                            </div>
                        ))}
                </div>
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
        user: state.auth.user,
        project: state.projects.singleProject
    }
}

// Export
export default connect(mapStateToProps)(ProjectChatComponent)
