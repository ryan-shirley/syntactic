import React, { Component } from "react"
import { connect } from "react-redux"
import { signIn } from "../../store/actions/authActions"

import { StyledFirebaseAuth } from "react-firebaseui"
import firebase from "firebase/app"
import "firebase/auth"

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "redirect",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/dashboard",
    // We will display Google as the auth provider.
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
}

class SignIn extends Component {
    state = {
        email: "",
        password: ""
    }
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.signIn(this.state)
    }

    render() {
        const { error, requestProcessing } = this.props

        return (
            <div className="card">
                <div className="card-header">Login</div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                id="email"
                                onChange={this.handleChange}
                                className="form-control"
                                required
                            />
                            {error && error.fields && (
                                <span className="badge badge-pill badge-danger">
                                    {error.fields.email}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                onChange={this.handleChange}
                                className="form-control"
                                required
                            />
                            {error && error.fields && (
                                <span className="badge badge-pill badge-danger">
                                    {error.fields.password}
                                </span>
                            )}
                        </div>
                        {error && !error.fields && (
                            <p>
                                <span className="badge badge-pill badge-danger">
                                    {error.message}
                                </span>
                            </p>
                        )}

                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={requestProcessing}
                        >
                            {requestProcessing ? "Logging In.." : "Login"}
                        </button>
                    </form>

                    <hr />

                    <p className="text-center">Or</p>

                    <StyledFirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={firebase.auth()}
                    />
                </div>
            </div>
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
