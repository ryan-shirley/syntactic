// React
import React from "react"

// Redux
import { connect } from "react-redux"

// Components
import { Link, NavLink } from "react-router-dom"
import {
    Navbar,
    Nav,
    Image,
    Button,
    DropdownButton,
    Dropdown
} from "react-bootstrap"

// Links
import SignedInLinks from "../app/SignedInLinks"

class MainNavbar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isNavOpen: false
        }
    }

    render() {
        let { isNavOpen } = this.state
        const { auth, user } = this.props

        const links = !auth.uid ? (
            <>
                <Button as={Link} variant="link" to="/login">
                    Sign In
                </Button>
                <DropdownButton
                    id="register-dropdown"
                    title="Register"
                    className="d-inline"
                    alignRight
                    drop="down"
                >
                    <Dropdown.Item as={Link} to="/register/writer">
                        Writer
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/register/content-seeker">
                        Content Seeker
                    </Dropdown.Item>
                </DropdownButton>
            </>
        ) : (
            <SignedInLinks user={user} />
        )

        return (
            <Navbar expand="md" className="public-nav">
                <Navbar.Brand as={Link} to="/">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Flogo-dark.png?alt=media"
                        alt="Syntactic"
                        className="logo"
                    />
                </Navbar.Brand>

                <button
                    className={
                        "navbar-toggler hamburger hamburger--squeeze" +
                        (isNavOpen ? " is-active" : "")
                    }
                    type="button"
                    data-toggle="collapse"
                    data-target="#syntactic-navbar"
                    aria-controls="syntactic-navbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => this.setState({ isNavOpen: !isNavOpen })}
                >
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>

                <Navbar.Collapse id="syntactic-navbar">
                    <Nav className="ml-auto mr-auto">
                        <Nav.Link as={NavLink} to="/">
                            Home
                        </Nav.Link>
                        {/* <Nav.Link as={NavLink} to="/features">
                            Features
                        </Nav.Link> */}
                        <Nav.Link as={NavLink} to="/tech">
                            Tech
                        </Nav.Link>
                    </Nav>
                    <div className="button-group">{links}</div>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(MainNavbar)
