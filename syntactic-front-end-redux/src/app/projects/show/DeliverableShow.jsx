// React
import React, { Component } from "react"

// Redux
import { connect } from "react-redux"

// Components
import { Modal, Jumbotron, Button, Badge, Form } from "react-bootstrap"

import * as Showdown from "showdown"

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
})

class DeliverableShow extends Component {
    constructor() {
        super()

        this.state = {
            content_seeker_notes: ""
        }
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
    }

    /**
     * onSubmit() Submit form to update deliverable
     */
    onSubmit = (e, acceped) => {
        e.preventDefault()

        let deliverable = this.props.deliverable

        if (acceped) {
            deliverable.status = "accepted"
        } else {
            deliverable.status = "rejected"
        }

        if (this.state.content_seeker_notes) {
            deliverable.content_seeker_notes = this.state.content_seeker_notes
        }

        this.props.updateDeliverable(deliverable)
    }

    render() {
        let { deliverable } = this.props

        return (
            <Modal
                show
                onHide={this.props.closeModal}
                animation={true}
                centered
                size="lg"
            >
                <Modal.Header>
                    <Modal.Title>{deliverable.title}</Modal.Title>
                    <Badge
                        variant={
                            deliverable.status === "accepted"
                                ? "success"
                                : deliverable.status === "rejected"
                                ? "danger"
                                : "warning"
                        }
                        className="float-right"
                    >
                        {deliverable.status}
                    </Badge>
                </Modal.Header>
                <Modal.Body>
                    <Jumbotron
                        dangerouslySetInnerHTML={{
                            __html: converter.makeHtml(deliverable.content)
                        }}
                    ></Jumbotron>

                    {deliverable.writer_notes && (
                        <>
                            <h5 className="text-uppercase">
                                {this.props.role === "writer"
                                    ? "Your Notes"
                                    : "Writer Notes"}
                            </h5>
                            <hr />
                            <p>{deliverable.writer_notes}</p>
                        </>
                    )}

                    {deliverable.content_seeker_notes && (
                        <>
                            <h5 className="text-uppercase">
                                {this.props.role === "content seeker"
                                    ? "Your Notes"
                                    : "Client Notes"}
                            </h5>
                            <hr />
                            <p>{deliverable.content_seeker_notes}</p>
                        </>
                    )}

                    {!deliverable.content_seeker_notes &&
                        this.props.role === "content seeker" && (
                            <Form className="mt-3">
                                <Form.Group controlId="formContentSeekerNotes">
                                    <h5 className="text-uppercase">
                                        Your Notes
                                    </h5>
                                    <hr />

                                    <Form.Control
                                        type="text"
                                        name="content_seeker_notes"
                                        value={this.state.content_seeker_notes}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>

                                <Button
                                    type="submit"
                                    variant="danger"
                                    onClick={e => this.onSubmit(e, false)}
                                >
                                    Reject
                                </Button>
                                <Button
                                    type="submit"
                                    onClick={e => this.onSubmit(e, true)}
                                >
                                    Accept
                                </Button>
                            </Form>
                        )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

// Mapping
const mapStateToProps = state => {
    return {
        role: state.auth.user.role[0].name
    }
}

// Export
export default connect(mapStateToProps)(DeliverableShow)
