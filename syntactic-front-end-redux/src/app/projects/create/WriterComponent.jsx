import React, { Component } from "react"
import { Alert, Form, Row, Col, Button, Spinner } from "react-bootstrap"
import { Redirect } from "react-router-dom"

class WriterComponent extends Component {
    constructor(props) {
        super(props)
    }

    /**
     * onSubmit() Submit form to login
     */
    // onSubmit = e => {
    //     e.preventDefault()
    //     this.props.createProject(this.state)
    // }

    render() {
        let { requestProcessing, error } = this.props.projects
        
        return (
            <>
                {error && (
                    <Alert variant="danger">{error.message}</Alert>
                )}

                <h2>This is the writer component</h2>
            </>
        )
    }
}

export default WriterComponent
