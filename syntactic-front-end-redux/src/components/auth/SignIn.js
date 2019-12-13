import React, { Component } from "react"
import { connect } from "react-redux"
import { signIn } from "../../store/actions/authActions"
import { Redirect } from "react-router-dom"

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
        const { authError, auth } = this.props
        if (auth.uid) return <Redirect to="/dashboard" />

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
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                onChange={this.handleChange}
                                className="form-control"
                            />
                        </div>
                        {authError && (
                            <p>
                                <span className="badge badge-pill badge-danger">
                                    {authError}
                                </span>
                            </p>
                        )}

                        <button className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: creds => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
