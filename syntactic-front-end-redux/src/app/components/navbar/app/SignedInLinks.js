// React
import React from "react"
import { connect } from "react-redux"
import { Image, Dropdown } from "react-bootstrap"
import { Link } from "react-router-dom"

// Actions
import { signOut } from "../../../../store/actions/authActions"

/**
 * SignedInLinks() Links for main navigation only for authenticated users
 */
const SignedInLinks = props => {
    return (
        <Dropdown alignRight>
            <Dropdown.Toggle as="button">
                <Image
                    src={props.user.profile_picture || "/img/default-profile.jpg"}
                    className="mr-3 rounded-circle img-fluid"
                    width="40"
                    height="40"
                    alt={props.user.first_name + " " + props.user.last_name}
                />{" "}
                {props.user.first_name} {props.user.last_name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">
                    Edit Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={props.signOut}>
                    Log Out
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
