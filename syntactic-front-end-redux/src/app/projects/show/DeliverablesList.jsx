// React
import React, { Component } from "react"

// Components
import Moment from "react-moment"
import { Row, Col, Card, Badge } from "react-bootstrap"
import DeliverableShow from "./DeliverableShow"

class DeliverablesList extends Component {
    constructor() {
        super()

        this.state = {
            viewing: null
        }
    }

    /**
     * viewDeliverable() Open deliverable modal
     */
    viewDeliverable(deliverable) {
        this.setState({
            viewing: deliverable
        })
    }

    render() {
        let { deliverables } = this.props

        return (
            <>
                <h6 className="text-uppercase">
                    Deliverables ({deliverables ? deliverables.length : 0})
                </h6>
                {deliverables &&
                    deliverables.map(item => (
                        <Card body key={item._id}>
                            <Row>
                                <Col>
                                    <span
                                        className="text-primary"
                                        onClick={() =>
                                            this.viewDeliverable(item)
                                        }
                                    >
                                        {item.title}
                                    </span>
                                </Col>
                                <Col>
                                    <Moment format="DD MMM YYYY - h:mm a">
                                        {item.createdAt}
                                    </Moment>
                                </Col>
                                <Col>
                                    <Badge
                                        variant={
                                            item.status === "accepted"
                                                ? "success"
                                                : item.status === "rejected"
                                                ? "danger"
                                                : "warning"
                                        }
                                        className="float-right"
                                    >
                                        {item.status}
                                    </Badge>
                                </Col>
                            </Row>
                        </Card>
                    ))}

                {this.state.viewing && (
                    <DeliverableShow
                        deliverable={this.state.viewing}
                        updateDeliverable={this.props.updateDeliverable}
                        closeModal={() => this.setState({ viewing: null })}
                    />
                )}
            </>
        )
    }
}

export default DeliverablesList
