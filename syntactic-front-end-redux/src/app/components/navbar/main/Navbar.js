// React
import React from "react"

// Components
import { Link, NavLink } from "react-router-dom"
import { Navbar, Nav, Image, Button } from "react-bootstrap"

class MainNavbar extends React.Component {
    constructor() {
        super()

        this.state = {
            isNavOpen: false
        }
    }

    render() {
        let { isNavOpen } = this.state

        return (
            <Navbar expand="md" className="public-nav">
                <Navbar.Brand as={Link} to="/">
                    <Image
                        src="/logo-dark.png"
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
                        <Nav.Link as={NavLink} to="/features">
                            Features
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/tech">
                            Tech
                        </Nav.Link>
                    </Nav>
                    <div className="button-group">
                        <Button as={Link} variant="link" to="/login">
                            Sign In
                        </Button>
                        <Button as={Link} variant="primary" to="/register">
                            Register
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default MainNavbar
