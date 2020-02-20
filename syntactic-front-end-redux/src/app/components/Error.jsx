import React from "react"
import { Alert } from "react-bootstrap"

const Error = props => {
    let { message, code } = props.error

    return (
        <Alert variant="danger" dismissible>
            <Alert.Heading>Code: {code}</Alert.Heading>
            <p>{message}</p>
        </Alert>
    )
}

export default Error
