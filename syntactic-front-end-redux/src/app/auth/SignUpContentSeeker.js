// React
import React, { Component } from "react"

// Redux
import { connect } from "react-redux"

// Actions
import { signUp } from "../../store/actions/authActions"

// Components
import { Redirect } from "react-router-dom"
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap"
import FirebaseProviderSignIn from "../components/FirebaseProviderSignIn"
import { Link } from "react-router-dom"

class SignUpContentSeeker extends Component {
    state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        conf_password: ""
    }

    /**
     * handleChange() Handle form input
     */
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    /**
     * handleSubmit() Handle sign in with email and password
     */
    handleSubmit = e => {
        e.preventDefault()

        this.props.signUp(this.state)
    }

    render() {
        const { error, user } = this.props

        // Redirect when registered or signed in
        if (Object.entries(user).length !== 0 && user === Object)
            return <Redirect to="/onboarding/writer" />

        return (
            <Container fluid className="auth-form">
                <Row className="align-items-center justify-content-md-center">
                    <Col lg={6} xl={3}>
                        <h1>Register Content Seeker</h1>
                        <Link to="/login">Already have an account?</Link>

                        <Form onSubmit={this.handleSubmit} className="my-5">
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="formFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="first_name"
                                            onChange={this.handleChange}
                                            required
                                        />

                                        {error && error.fields && (
                                            <span className="badge badge-pill badge-danger">
                                                {error.fields.first_name}
                                            </span>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="last_name"
                                            onChange={this.handleChange}
                                            required
                                        />

                                        {error && error.fields && (
                                            <span className="badge badge-pill badge-danger">
                                                {error.fields.last_name}
                                            </span>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Form.Row>

                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    onChange={this.handleChange}
                                    required
                                />

                                {error && error.fields && (
                                    <span className="badge badge-pill badge-danger">
                                        {error.fields.email}
                                    </span>
                                )}
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onChange={this.handleChange}
                                    required
                                />

                                {error && error.fields && (
                                    <span className="badge badge-pill badge-danger">
                                        {error.fields.password}
                                    </span>
                                )}
                            </Form.Group>

                            <Form.Group controlId="formConfPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="conf_password"
                                    onChange={this.handleChange}
                                    required
                                />

                                {error && error.fields && (
                                    <span className="badge badge-pill badge-danger">
                                        {error.fields.conf_password}
                                    </span>
                                )}
                            </Form.Group>

                            {error && !error.fields && (
                                <p>
                                    <span className="badge badge-pill badge-danger">
                                        {error.message}
                                    </span>
                                </p>
                            )}

                            <Button variant="primary" block type="submit">
                                Register
                            </Button>
                        </Form>
                        <div className="firebase-provider-section">
                            <p className="text-center">or</p>
                            <FirebaseProviderSignIn />
                        </div>
                    </Col>
                    <Col lg={6} xl={{ span: 5, offset: 1 }}>
                        <Image
                            src="https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Fcontent-seeker-hero.jpg?alt=media"
                            className="img-fluid hero-image"
                            alt="Syntactic Content Seekers"
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        error: state.auth.error,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: creds => dispatch(signUp(creds, "content-seeker"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContentSeeker)
