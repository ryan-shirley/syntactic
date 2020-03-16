// React
import React from "react"

// Components
import { Container, Row, Col, Image } from "react-bootstrap"
import Footer from "../components/Footer"
import OwlCarousel from "react-owl-carousel"
import "owl.carousel/dist/assets/owl.theme.default.css"

// Slider Styles
import "owl.carousel/dist/assets/owl.carousel.css"

const TechContainer = () => {
    let designImages = [
            "https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Ftech-logos%2FAdobe_XD.svg?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Ftech-logos%2FCreative_Cloud.svg?alt=media"
        ],
        frontEndImages = [
            "https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Ftech-logos%2Freact.svg?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Ftech-logos%2Fredux.svg?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Ftech-logos%2Fbootstrap.svg?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Ftech-logos%2Fsass.svg?alt=media"
        ],
        backEndImages = [
            "https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Ftech-logos%2Fexpress.svg?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Ftech-logos%2Fgoogle-cloud.svg?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Ftech-logos%2Ffirebase.svg?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Ftech-logos%2Fmongo-db.svg?alt=media"
        ],
        deploymentImages = [
            "https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Ftech-logos%2Fheroku.svg?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Ftech-logos%2Fmongo-db.svg?alt=media"
        ]

    let designSlider = (
            <OwlCarousel
                className="owl-theme logo-list auto-width"
                margin={40}
                responsive={{
                    0: {
                        items: 3
                    },
                    768: {
                        items: 5
                    }
                }}
            >
                {designImages.map(image => (
                    <div className="item" key={image}>
                        <Image src={image} className="img-fluid" />
                    </div>
                ))}
            </OwlCarousel>
        ),
        frontEndSlider = (
            <OwlCarousel
                className="owl-theme logo-list"
                margin={40}
                responsive={{
                    0: {
                        items: 3
                    },
                    1200: {
                        items: 4
                    }
                }}
            >
                {frontEndImages.map(image => (
                    <div className="item" key={image}>
                        <Image src={image} className="img-fluid" />
                    </div>
                ))}
            </OwlCarousel>
        ),
        backEndSlider = (
            <OwlCarousel
                className="owl-theme logo-list"
                margin={40}
                responsive={{
                    0: {
                        items: 3
                    },
                    1200: {
                        items: 4
                    }
                }}
            >
                {backEndImages.map(image => (
                    <div className="item" key={image}>
                        <Image src={image} className="img-fluid" />
                    </div>
                ))}
            </OwlCarousel>
        ),
        deploymentSlider = (
            <OwlCarousel
                className="owl-theme logo-list auto-width"
                margin={40}
                responsive={{
                    0: {
                        items: 2
                    },
                    1200: {
                        items: 3
                    }
                }}
            >
                {deploymentImages.map(image => (
                    <div className="item" key={image}>
                        <Image src={image} className="img-fluid" />
                    </div>
                ))}
            </OwlCarousel>
        )

    return (
        <div className="home">
            <Container>
                <section className="hero">
                    <h1>The tech behind Syntactic</h1>
                    <p className="message">
                        This is some of the tech that was used in building
                        Syntactic. From initial design to production on a
                        server. The MERN stack was used in this project.
                    </p>
                </section>

                <Row className="align-items-center">
                    <Col sm={6}>
                        <span className="writers">
                            <Image
                                src={
                                    "https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Fdesign.jpg?alt=media"
                                }
                                className="img-fluid"
                                alt="Syntactic Writers"
                            />
                        </span>
                    </Col>
                    <Col sm={6} className="details">
                        <p className="heading">Design</p>
                        <hr />

                        <h4 className="title">A solution to a problem</h4>
                        <p className="copy">
                            Not only creating a beautiful design but creating a
                            real solution to a problem. Paper prototypes were
                            the key to succesfully designing both a functional
                            and visually appealing user interface.{" "}
                        </p>

                        <p className="copy">
                            Adobe XD was used heavily in the design process for
                            creating high fidelity mockups that would be later
                            used a reference for implemention. Along with this
                            the{" "}
                            <a
                                href="https://www.adobe.com/ie/creativecloud.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Creative Cloud
                            </a>{" "}
                            suite was used to create other assets.
                        </p>
                        <p className="copy">
                            Photos sourced from{" "}
                            <a
                                href="https://unsplash.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                unsplash.com
                            </a>
                            .
                        </p>

                        {designSlider}
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col sm={6} className="details order-12 order-md-1">
                        <p className="heading">Front End</p>
                        <hr />

                        <h4 className="title">Fast and modern stack</h4>
                        <p className="copy">
                            React at the core, along with Redux for state
                            management. A customised version of bootstrap was
                            complied with the use of SASS to achieve the same
                            style from the interface designs.
                        </p>

                        {frontEndSlider}
                    </Col>
                    <Col sm={6} className="order-1 order-md-12">
                        <span className="content-seekers">
                            <Image
                                src={
                                    "https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Ffront-end.jpg?alt=media"
                                }
                                className="img-fluid"
                                alt="Syntactic Content Seekers"
                            />
                        </span>
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col sm={6}>
                        <span className="writers">
                            <Image
                                src={
                                    "https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Fback-end.jpg?alt=media"
                                }
                                className="img-fluid"
                                alt="Syntactic Writers"
                            />
                        </span>
                    </Col>
                    <Col sm={6} className="details">
                        <p className="heading">Back End</p>
                        <hr />

                        <h4 className="title">The secret sauce</h4>
                        <p className="copy">
                            MongoDB handled the data storage created from the
                            Express API. Mongoose to enforced a common schema on
                            this data. Additional assets both user and system
                            were stored on Firebase Cloud Storage.
                        </p>

                        <p className="copy">
                            Authentication was handled by Firebase Auth allowing
                            for a simple, multi-platform sign-in. Sign in with
                            Google was implemetned along side email and
                            password.
                        </p>

                        <p className="copy">
                            The Google Natural Language API was used to handle
                            the processing of the users content, to generate
                            information about the writers, while also being able
                            to match a project brief to a list of relevant
                            writers.
                        </p>

                        <p className="copy">
                            Testing the logic in Express was done using Jest.
                        </p>

                        {backEndSlider}
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col sm={6} className="details order-12 order-md-1">
                        <p className="heading">Deployment</p>
                        <hr />

                        <h4 className="title">Serving the world</h4>
                        <p className="copy">
                            A Heroku pipeline was used to automatically deploy
                            updates from GitHub. MongoDB is hosted on a MongoDB
                            Atlas cluster on AWS.
                        </p>

                        {deploymentSlider}
                    </Col>
                    <Col sm={6} className="order-1 order-md-12">
                        <span className="content-seekers">
                            <Image
                                src={
                                    "https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Fdeployment.jpg?alt=media"
                                }
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

export default TechContainer
