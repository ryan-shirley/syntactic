// React
import React, { Component } from "react"

// Components
import UserInvite from "../../components/UserInvite"
import DataLoading from "../../components/DataLoading"
import Error from "../../components/Error"
import { Row } from "react-bootstrap"

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
        recommended && (recommendedWriters = recommended.writers.map(writer => <UserInvite key={writer._id} writer={writer} categories={recommended.categories} onInviteClick={this.onInviteClick} writersList={writersList} />))
        // Relevant
        let relevantWriters
        relevant && (relevantWriters = relevant.writers.map(writer => <UserInvite key={writer._id} writer={writer} categories={relevant.categories} onInviteClick={this.onInviteClick} writersList={writersList} />))
        // Others
        let othersWriters
        others && (othersWriters = others.writers.map(writer => <UserInvite key={writer._id} writer={writer} categories={others.categories} onInviteClick={this.onInviteClick} writersList={writersList} />))

        let writerList = [recommendedWriters, relevantWriters, othersWriters]

        return (
            <>
                {error && <Error error={error} />}

                {requestProcessing ? (
                    <DataLoading />
                ) : (
                    <Row className="justify-content-md-center writer-list">
                        {writerList}
                    </Row>
                )}
            </>
        )
    }
}

export default WriterComponent
