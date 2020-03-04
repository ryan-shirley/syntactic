// React
import React, { Component } from "react"

// Redux
import { connect } from "react-redux"

// Actions
import { signUpWithRoleMongo } from "../../store/actions/authActions"

// Components
import { Row, Col, Button } from "react-bootstrap"

class RoleComponent extends Component {
    /**
     * choseRole() Register a user for a role
     */
    choseRole = role => {
        this.props.signUpWithRoleMongo(role)
    }

    render() {
        const { requestProcessing } = this.props

        return (
            <Row className="justify-content-md-center mt-5">
                <Col sm={4}>
                    <h3>Please Choose A Role</h3>

                    <Button variant="primary" className="mr-3" onClick={() => this.choseRole('writer')} disabled={requestProcessing}>{requestProcessing ? "Processing.." : "Writer"}</Button>
                    <Button variant="orange" onClick={() => this.choseRole('content seeker')} disabled={requestProcessing}>{requestProcessing ? "Processing.." : "Content Seeker"}</Button>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => {
    return {
        requestProcessing: state.auth.requestProcessing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUpWithRoleMongo: role => dispatch(signUpWithRoleMongo(role))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleComponent)

