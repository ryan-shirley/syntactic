import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { signUp } from "../../store/actions/authActions"

class SignUpWriter extends Component {
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
        const { auth, authError, signupSucess } = this.props
        if (auth.uid && signupSucess) return <Redirect to="/onboarding/writer" />

        return (
            <div className="card">
                <div className="card-header">Writer Sign Up</div>
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
                        {authError && (
                            <p>
                                <span className="badge badge-pill badge-danger">
                                    {authError}
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
    console.log(state);
    
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,
        signupSucess: state.auth.signupSucess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: creds => dispatch(signUp(creds, 'writer'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpWriter)
