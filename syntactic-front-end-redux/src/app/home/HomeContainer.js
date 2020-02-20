// React
import React from "react"
import { Jumbotron, Container, Row, Col } from "react-bootstrap"

const HomeContainer = () => {
    return (
        <div className="text-center">
            <Jumbotron>
                <Container>
                    <Row className="justify-content-md-center mt-5">
                        <Col md={7}>
                            <h1>
                                <span className="mr-3" role="img" aria-label="jsx-a11y/accessible-emoji">👩🏼‍💻</span> Welcome to
                                Syntactic <span className="ml-3" role="img" aria-label="jsx-a11y/accessible-emoji">👨🏾‍💻</span>
                            </h1>
                            <p>
                                Syntactic is a natural language processing
                                application. I use this to learn about our
                                writers and what they write. I also use this
                                to analyse a projects brief to best get
                                writers who are suited.
                            </p>

                            <hr style={{ width: 80 }} className="mb-4" />
                        </Col>
                    </Row>

                    <h2 className="mb-4">Some of the tools that I used</h2>
                    <Row className="justify-content-md-center">
                        <Col md={7}>
                            <h3>Front End</h3>
                            <hr style={{ width: 40 }} className="mb-4" />
                            <div className="icon-list">
                                <img src="/svg/react.svg" alt="react" />
                                <img src="/svg/bootstrap.svg" alt="bootstrap" />
                                <img src="/svg/sass.svg" alt="sass" />
                                <img src="/svg/redux.svg" alt="redux" />
                            </div>

                            <h3>Back End</h3>
                            <hr style={{ width: 40 }} className="mb-4" />
                            <div className="icon-list">
                                <img src="/svg/express.svg" alt="express" />
                                <img src="/svg/mongo-db.svg" alt="mongo" />
                                <img src="/svg/firebase.svg" alt="firebase" />
                                <img src="/svg/google-cloud.svg" alt="Google Cloud" />
                            </div>

                            <h3>Deployment</h3>
                            <hr style={{ width: 40 }} className="mb-4" />
                            <div className="icon-list">
                                <img src="/svg/heroku.svg" alt="Heroku" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        </div>
    )
}

export default HomeContainer
