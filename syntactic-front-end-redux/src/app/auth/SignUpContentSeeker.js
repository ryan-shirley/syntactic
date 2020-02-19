import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { signUp } from "../../store/actions/authActions"

class SignUpContentSeeker extends Component {
    state = {
        first_name: "",
        last_name: "",
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
        this.props.signUp(this.state)
    }
    render() {
        const { error, user } = this.props
        if (Object.entries(user).length !== 0 && user === Object) return <Redirect to="/onboarding/writer" />

        return (
            <div className="card">
                <div className="card-header">Content Seeker Sign Up</div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="first_name">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        onChange={this.handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        onChange={this.handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                id="email"
                                onChange={this.handleChange}
                                className="form-control"
                                required
                            />
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
                        </div>
                        {error && (
                            <p>
                                <span className="badge badge-pill badge-danger">
                                    {error.message}
                                </span>
                            </p>
                        )}

                        <button className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
            </div>
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
        signUp: creds => dispatch(signUp(creds, 'content-seeker'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContentSeeker)
