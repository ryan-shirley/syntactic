import React from "react"
import SignedInLinks from "./SignedInLinks"
import { connect } from "react-redux"
import { Row, Col, Button } from "react-bootstrap"
import Moment from "react-moment"

const Navbar = props => {
    const { auth, user } = props
    const links = auth.uid ? <SignedInLinks user={user} /> : null

    return (
        <div className="main-nav">
            <Row>
                <Col className="mt-2 text-muted">
                    <Moment className="d-none d-sm-block" format="h:mm A DD/MM/YYYY">{new Date()}</Moment>
                    <span className="d-block d-sm-none"><Button variant="primary" className="sidebar-toggle" onClick={props.toggleSidebar}>Toggle Menu</Button></span>
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

const mapDispatchToProps = dispatch => {
    return {
        toggleSidebar: () => dispatch({ type: "TOGGLE_MOBILE_SIDEBAR" })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
