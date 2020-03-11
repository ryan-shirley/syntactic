// React
import React, { Component } from "react"

// Components
import { Form, Row, Col, Button, Spinner, Card } from "react-bootstrap"
import Error from "../components/Error"

class EditProfileComponent extends Component {
    constructor(props) {
        super(props)

        this.state = props.auth.user
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
     * handleProfileInputChange() Handle form input from user
     */
    handleProfileInputChange = e => {
        // Current State
        const { profile } = { ...this.state }
        const currentState = profile

        // Form input
        const target = e.target
        const { name, value } = target

        // Update
        currentState[name] = value
        this.setState({
            profile: currentState
        })
    }

    /**
     * onSubmit() Update user profile
     */
    onSubmit = e => {
        e.preventDefault()

        this.props.updateUser(this.state)
    }

    render() {
        const { auth } = this.props
        const { error, requestProcessing } = auth
        const user = this.state

        return (
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <Card body>
                        <h2>Edit Profile</h2>
                        <hr />

                        <Form onSubmit={this.onSubmit} className="mt-5">
                            {error && <Error error={error} />}

                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="formFirstName">
                                        <Form.Label>First Name*</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="first_name"
                                            value={user.first_name}
                                            onChange={this.handleInputChange}
                                            required
                                        />

                                        {error &&
                                            error.fields &&
                                            error.fields.first_name && (
                                                <span className="badge badge-pill badge-danger">
                                                    {error.fields.first_name}
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formLastName">
                                        <Form.Label>Last Name*</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="last_name"
                                            value={user.last_name}
                                            onChange={this.handleInputChange}
                                            required
                                        />

                                        {error &&
                                            error.fields &&
                                            error.fields.last_name && (
                                                <span className="badge badge-pill badge-danger">
                                                    {
                                                        error.fields.last_name
                                                            .message
                                                    }
                                                </span>
                                            )}
                                    </Form.Group>
                                </Col>
                            </Form.Row>

                            <Form.Group controlId="formBio">
                                <Form.Label>Bio*</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    name="bio"
                                    value={user.profile.bio}
                                    onChange={this.handleProfileInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formBusiness">
                                <Form.Label>Business*</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    name="business"
                                    value={user.profile.business}
                                    onChange={this.handleProfileInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formProfilePicture">
                                <Form.Label>New Profile Picture</Form.Label>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="customFile"
                                        onChange={e =>
                                            this.setState({
                                                file:
                                                    e.target.files[0]
                                            })
                                        }
                                    />
                                    <label
                                        className="custom-file-label"
                                        htmlFor="customFile"
                                    >
                                        {user.file
                                            ? user.file.name
                                            : "Choose file"}
                                    </label>
                                </div>
                            </Form.Group>

                            <Button type="submit" disabled={requestProcessing}>
                                {requestProcessing ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="mr-3"
                                        />
                                        Updating...
                                    </>
                                ) : (
                                    "Update"
                                )}
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default EditProfileComponent
