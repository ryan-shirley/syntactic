// React
import React, { Component } from "react"

// Components
import { Table } from "react-bootstrap"
import UserInvite from "../../components/UserInvite"
import DataLoading from "../../components/DataLoading"
import Error from "../../components/Error"

class WriterComponent extends Component {
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
                {error && <Error error={error} />}

                {requestProcessing ? (
                    <DataLoading />
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
