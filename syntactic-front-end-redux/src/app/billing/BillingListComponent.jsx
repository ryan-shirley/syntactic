// React
import React, { Component } from "react"

// Components
import DataLoading from "../components/DataLoading"
import { Card, Row, Col, Badge, Button } from "react-bootstrap"

class BillingListComponent extends Component {
    constructor(props) {
        super(props)

        // Load all payments
        props.getAllPayments()
    }

    /**
     * openPayment() Open payment form
     */
    openPayment = payment => {
        this.props.setPaymentBeingPayed(payment)
        this.props.history.push("/billing/payment/" + payment._id)
    }

    render() {
        let { payments, isLoadingdata } = this.props.billing

        let list = isLoadingdata ? (
            <DataLoading />
        ) : (
            <ul
                className={
                    "card-list " +
                    (payments.length === 1
                        ? "single"
                        : payments.length === 2
                        ? "double"
                        : "multi")
                }
            >
                {payments.map(payment => (
                    <li className="item" key={payment._id}>
                        <Card body>
                            <Row>
                                <Col>{payment.project_id.title}</Col>
                                <Col className="body-text-light">€{payment.amount}</Col>
                                <Col>
                                    <Badge
                                        variant={
                                            payment.status === "pending"
                                                ? "warning"
                                                : "success"
                                        }
                                        className="float-right badge-md text-uppercase"
                                    >
                                        {payment.status}
                                    </Badge>
                                </Col>
                                {payment.status !== "paid" && (
                                    <Col>
                                        <Button
                                            onClick={() =>
                                                this.openPayment(payment)
                                            }
                                            variant="primary"
                                        >
                                            Pay
                                        </Button>
                                    </Col>
                                )}
                            </Row>
                        </Card>
                    </li>
                ))}
            </ul>
        )

        return (
            <>
                <h2>Payments List</h2>
                {list}
            </>
        )
    }
}

export default BillingListComponent
