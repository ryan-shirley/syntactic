// React
import React, { Component } from "react"

// Redux
import { connect } from "react-redux"

// Actions
import { signUpWithRoleMongo } from "../../store/actions/authActions"

// Components
import { Form, Row, Col, Card } from "react-bootstrap"

// Fonts
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenFancy, faAddressBook } from "@fortawesome/free-solid-svg-icons"

// Data
import csc from "country-state-city"

class RoleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            country: "",
            city: "",
            countries: csc.getAllCountries(),
            cities: [],
            error: {}
        }
    }

    /**
     * choseRole() Register a user for a role
     */
    choseRole = role => {
        let location = this.state.city + ', ' + this.state.country

        this.props.signUpWithRoleMongo(role, location)
    }

    /**
     * handleChange() Handle form input
     */
    handleChange = e => {
        if (e.target.name === "countryId") {
            this.setState({
                country: csc.getCountryById(e.target.value).sortname,
                cities: csc.getStatesOfCountry(e.target.value)
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    render() {
        const { requestProcessing } = this.props
        const { city, error } = this.state

        return (
            <>
                <Row className="justify-content-md-center text-center stats mt-5">
                    <Col sm={4}>
                        <h1 className="display2 mb-5">Location</h1>

                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="formCountry">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="countryId"
                                            onChange={this.handleChange}
                                        >
                                            <option></option>
                                            {this.state.countries.map(
                                                country => (
                                                    <option
                                                        key={country.id}
                                                        value={country.id}
                                                    >
                                                        {country.name}
                                                    </option>
                                                )
                                            )}
                                        </Form.Control>

                                        {error && error.fields && (
                                            <span className="badge badge-pill badge-danger">
                                                {error.fields.country}
                                            </span>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="city"
                                            onChange={this.handleChange}
                                        >
                                            {this.state.cities.length > 0 && (
                                                <option></option>
                                            )}
                                            {this.state.cities.map(city => (
                                                <option
                                                    key={city.id}
                                                    value={city.name}
                                                >
                                                    {city.name}
                                                </option>
                                            ))}
                                        </Form.Control>

                                        {error && error.fields && (
                                            <span className="badge badge-pill badge-danger">
                                                {error.fields.city}
                                            </span>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
                {city && (
                    <Row className="justify-content-md-center text-center stats mt-5">
                    <Col sm={4}>
                        <h1 className="display2 mb-5">Choose A Role</h1>

                        <Row>
                            <Col>
                                <Card
                                    body
                                    onClick={() => this.choseRole("writer")}
                                    disabled={requestProcessing}
                                    className="py-4 stat hover-grow clickable"
                                >
                                    <span className={"icon icon-primary mb-4"}>
                                        <FontAwesomeIcon icon={faPenFancy} />
                                    </span>
                                    <h4>Writer</h4>
                                    <p className="px-2">
                                        You write about what you love and we
                                        will match clients briefs to your work.
                                    </p>
                                </Card>
                            </Col>
                            <Col>
                                <Card
                                    body
                                    onClick={() =>
                                        this.choseRole("content seeker")
                                    }
                                    disabled={requestProcessing}
                                    className="py-4 stat hover-grow clickable"
                                >
                                    <span className={"icon icon-primary mb-4"}>
                                        <FontAwesomeIcon icon={faAddressBook} />
                                    </span>
                                    <h4>Content Seeker</h4>
                                    <p className="px-2">
                                        You write about what you love and we
                                        will match clients briefs to your work.
                                    </p>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                )}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        requestProcessing: state.auth.requestProcessing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUpWithRoleMongo: (role, location) =>
            dispatch(signUpWithRoleMongo(role, location))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleComponent)
