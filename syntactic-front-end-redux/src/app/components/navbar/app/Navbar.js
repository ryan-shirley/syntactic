// React
import React from "react"

// Redux
import { connect } from "react-redux"

// Links
import SignedInLinks from "./SignedInLinks"

// Components
import { Row, Col } from "react-bootstrap"

const Navbar = props => {
    const { auth, user, isSidebarOpenMobile } = props
    const links = auth.uid ? <SignedInLinks user={user} /> : null

    return (
        <div className="main-nav">
            <Row>
                <Col className="mt-2 text-muted">
                    <span className="d-block d-sm-none">
                        <button
                            className={
                                "hamburger hamburger--vortex" +
                                (isSidebarOpenMobile ? " is-active" : "")
                            }
                            type="button"
                            onClick={props.toggleSidebar}
                        >
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </span>
                </Col>
                <Col className="text-right">{links}</Col>
            </Row>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        user: state.auth.user,
        isSidebarOpenMobile: state.auth.isSidebarOpenMobile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSidebar: () => dispatch({ type: "TOGGLE_MOBILE_SIDEBAR" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
