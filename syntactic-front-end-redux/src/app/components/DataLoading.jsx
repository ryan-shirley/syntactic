import React, { Component } from "react"
import { Spinner } from "react-bootstrap"

export default class DataLoading extends Component {
    render() {
        return (
            <div className="loading-screen">
                <Spinner
                    animation="grow"
                    variant="primary"
                    size="xl"
                    role="status"
                >
                </Spinner>
            </div>
        )
    }
}
