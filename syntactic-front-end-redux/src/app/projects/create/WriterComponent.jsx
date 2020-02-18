import React, { Component } from "react"
import { Alert, Table } from "react-bootstrap"

import UserInvite from "../../components/UserInvite"

class WriterComponent extends Component {
    constructor(props) {
        super(props)
    }

    /**
     * onInviteClick() Invite writer to the project
     */
    onInviteClick = writerId => {
        let project = this.props.projects.singleProject
        this.props.inviteWriterToProject(writerId, project)
        this.props.setCurrentView('review')
    }

    render() {
        let { requestProcessing, error, writersList } = this.props.projects
        let { recommended, relevant, others } = writersList

        // Recommended
        let recommendedWriters
        recommended && (recommendedWriters = recommended.writers.map(writer => <UserInvite writer={writer} categories={recommended.categories} onInviteClick={this.onInviteClick} />))
        // Relevant
        let relevantWriters
        relevant && (relevantWriters = relevant.writers.map(writer => <UserInvite writer={writer} categories={relevant.categories} onInviteClick={this.onInviteClick} />))
        // Others
        let othersWriters
        others && (othersWriters = others.writers.map(writer => <UserInvite writer={writer} categories={others.categories} onInviteClick={this.onInviteClick} />))

        let writerList = [recommendedWriters, relevantWriters, othersWriters]

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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {writerList}
                        </tbody>
                    </Table>
                )}
            </>
        )
    }
}

export default WriterComponent
