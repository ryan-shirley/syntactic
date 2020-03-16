// React
import React from "react"

// Components
import { Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import Footer from "./components/Footer"

// Fonts
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons"

const NotFound404 = () => {
    return (
        <div className="d-flex">
            <div id="page-content-wrapper">
                <main className="container-fluid mb-5">
                    <Row className="justify-content-md-center my-5 text-center">
                        <Col md={4}>
                            <h1 className="mb-3">Oops! Why are you here?</h1>
                            <p>
                                We are very sorry for the inconvenience. It
                                looks like the page you are trying access a page
                                that has been deleted or never even existed.
                            </p>
                            <p>
                                <code>Code: 404</code>
                            </p>
                            <Button
                                as={Link}
                                to="/dashboard"
                                variant="primary"
                                size="lg"
                                className="text-uppercase mt-5"
                            >
                                <FontAwesomeIcon icon={faLongArrowAltLeft} className="mr-2" />{" "}
                                Back to home
                            </Button>
                        </Col>
                    </Row>
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default NotFound404
