import React, { Component } from "react"
import { connect } from "react-redux"
import { signIn } from "../../store/actions/authActions"

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
        const { error } = this.props

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
                            {error && error.fields && <span className="badge badge-pill badge-danger">{error.fields.email}</span>}
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
                            {error && error.fields && <span className="badge badge-pill badge-danger">{error.fields.password}</span>}
                        </div>
                        {error && !error.fields && (
                            <p>
                                <span className="badge badge-pill badge-danger">
                                    {error.message}
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
