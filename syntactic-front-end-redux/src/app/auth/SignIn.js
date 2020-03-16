// React
import React, { Component } from "react"

// Redux
import { connect } from "react-redux"

// Actions
import { signIn } from "../../store/actions/authActions"

// Components
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap"
import FirebaseProviderSignIn from "../components/FirebaseProviderSignIn"

class SignIn extends Component {
    state = {
        email: "",
        password: ""
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
        this.props.signIn(this.state)
    }

    render() {
        const { error, requestProcessing } = this.props

        return (
            <Container fluid className="auth-form">
                <Row className="align-items-center justify-content-md-center">
                    <Col lg={6} xl={3}>
                        <h1>Sign In</h1>
                        <p>
                            A platform connecting thousands of people through
                            AI. Empowering daily life with technology.
                        </p>

                        <Form onSubmit={this.handleSubmit} className="my-5">
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

                            {error && !error.fields && (
                                <p>
                                    <span className="badge badge-pill badge-danger">
                                        {error.message}
                                    </span>
                                </p>
                            )}

                            <Button
                                variant="primary"
                                block
                                type="submit"
                                disabled={requestProcessing}
                            >
                                {requestProcessing ? "Processing.." : "Sign In"}
                            </Button>
                        </Form>
                        <div className="firebase-provider-section">
                            <p className="text-center">or</p>
                            <FirebaseProviderSignIn />
                        </div>
                    </Col>
                    <Col lg={6} xl={{ span: 5, offset: 1 }}>
                        <Image
                            src="https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Fsign-in-hero.jpg?alt=media"
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
        requestProcessing: state.auth.requestProcessing,
        error: state.auth.error,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: creds => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
