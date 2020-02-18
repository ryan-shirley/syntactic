import React, { Component } from "react"
import { Alert, Table, Form, Row, Col, Button, Spinner } from "react-bootstrap"

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
        let { requestProcessing, error, writersList } = this.props.projects

        let { recommended, relevant, others } = writersList

        return (
            <>
                {error && <Alert variant="danger">{error.message}</Alert>}

                {requestProcessing ? (
                    "Loading writers..."
                ) : (
                    <Table striped bordered hover className="mt-3">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Articles Written</th>
                                <th>Categories</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recommended &&
                                recommended.writers.map(writer => (
                                    <tr
                                        key={writer._id}
                                    >
                                        <td>{writer.user.first_name + ' ' + writer.user.last_name}</td>
                                        <td>
                                            {writer.articles_written}
                                        </td>
                                        <td>{recommended.categories.join(", ")}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                )}
            </>
        )
    }
}

export default WriterComponent
