// React
import React from "react"

// Components
import { Container, Row, Col, Image } from "react-bootstrap"
import FirebaseSignIn from "../components/FirebaseProviderSignIn"
import Footer from "../components/Footer"

const HomeContainer = () => {
    return (
        <div className="home">
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
                                src={"https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Fwriters.jpg?alt=media"}
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
                                src={"https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Fcontent-seekers.jpg?alt=media"}
                                className="img-fluid"
                                alt="Syntactic Content Seekers"
                            />
                        </span>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    )
}

export default HomeContainer
