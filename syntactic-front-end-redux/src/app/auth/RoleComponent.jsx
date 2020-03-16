// React
import React, { Component } from "react"

// Redux
import { connect } from "react-redux"

// Actions
import { signUpWithRoleMongo } from "../../store/actions/authActions"

// Components
import { Row, Col, Card } from "react-bootstrap"

// Fonts
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenFancy, faAddressBook } from "@fortawesome/free-solid-svg-icons"

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
            <Row className="justify-content-md-center text-center stats mt-5">
                <Col sm={4}>
                    <h1 className="display2 mb-5">Choose A Role</h1>

                    <Row>
                        <Col>
                            <Card
                                body
                                onClick={() => this.choseRole("writer")}
                                disabled={requestProcessing}
                                className="py-4 stat hover-grow clickable"
                            >
                                <span className={"icon icon-primary mb-4"}>
                                    <FontAwesomeIcon icon={faPenFancy} />
                                </span>
                                <h4>Writer</h4>
                                <p className="px-2">
                                    You write about what you love and we will
                                    match clients briefs to your work.
                                </p>
                            </Card>
                        </Col>
                        <Col>
                            <Card
                                body
                                onClick={() => this.choseRole("content seeker")}
                                disabled={requestProcessing}
                                className="py-4 stat hover-grow clickable"
                            >
                                <span className={"icon icon-primary mb-4"}>
                                    <FontAwesomeIcon icon={faAddressBook} />
                                </span>
                                <h4>Content Seeker</h4>
                                <p className="px-2">
                                    You write about what you love and we will
                                    match clients briefs to your work.
                                </p>
                            </Card>
                        </Col>
                    </Row>
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
