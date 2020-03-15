// React
import React from "react"

// Components
import { Container, Row, Col, Image } from "react-bootstrap"
import Navbar from "../components/navbar/main/Navbar"
import FirebaseSignIn from "../components/FirebaseProviderSignIn"

// Fonts
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopyright } from "@fortawesome/free-solid-svg-icons"

const HomeContainer = () => {
    return (
        <div className="home">
            <Navbar />

            <Container>
                <section className="hero">
                    <h1>Empower your business with AI!</h1>
                    <p className="message">
                        Saving you time by connecting businesses to writers and
                        vice versa through AI. Effortlessly saving you time!
                    </p>
                    <FirebaseSignIn />
                </section>

                <Row className="align-items-center">
                    <Col sm={6}>
                        <span className="writers">
                            <Image
                                src={"/img/writers.jpg"}
                                className="img-fluid"
                                alt="Syntactic Writers"
                            />
                        </span>
                    </Col>
                    <Col className="details">
                        <p className="heading">Writers</p>
                        <hr />

                        <h4 className="title">
                            Connecting your talent with clients
                        </h4>
                        <p className="copy">
                            You have made the leap to specialise in what you
                            write about. Let us connect you with clients who
                            need your services.
                        </p>
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col sm={6} className="details order-12 order-md-1">
                        <p className="heading">Content seekers</p>
                        <hr />

                        <h4 className="title">AI powered searching</h4>
                        <p className="copy">
                            You write the brief and let us take care of finding
                            some of the best and most relevant writers for your
                            project.
                        </p>
                    </Col>
                    <Col className="order-1 order-md-12">
                        <span className="content-seekers">
                            <Image
                                src={"/img/content-seekers.jpg"}
                                className="img-fluid"
                                alt="Syntactic Content Seekers"
                            />
                        </span>
                    </Col>
                </Row>

                <footer>
                    <Image
                        src="/logo-dark.png"
                        alt="Syntactic"
                        className="logo"
                    />
                    <p>
                        <FontAwesomeIcon icon={faCopyright} className="mr-1" /> Copyright{" "}
                        {new Date().getFullYear()}. Built by{" "}
                        <a
                            href="https://ryanshirley.ie"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ryan Shirley
                        </a>
                    </p>
                </footer>
            </Container>
        </div>
    )
}

export default HomeContainer
