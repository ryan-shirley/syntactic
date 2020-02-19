import React from "react"
import SignedInLinks from "./SignedInLinks"
import { connect } from "react-redux"
import { Row, Col } from "react-bootstrap"
import Moment from "react-moment"

const Navbar = props => {
    const { auth, user } = props
    const links = auth.uid ? <SignedInLinks user={user} /> : null

    return (
        <div className="main-nav">
            <Row>
                <Col className="mt-2 text-muted">
                    <Moment format=" h:mm A DD/MM/YYYY">{new Date()}</Moment>
                </Col>
                <Col className="text-right">{links}</Col>
            </Row>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Navbar)
