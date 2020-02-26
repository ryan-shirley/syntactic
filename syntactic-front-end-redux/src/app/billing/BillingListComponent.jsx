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
        this.props.history.push('/billing/payment/' + payment._id)
    }

    render() {
        let { payments, isLoadingdata } = this.props.billing

        let list = isLoadingdata ? (
            <DataLoading />
        ) : (
            payments.map(payment => (
                <Card body className="mb-1" key={payment._id}>
                    <Row>
                        <Col>{payment.project_id.title}</Col>
                        <Col>€{payment.amount}</Col>
                        <Col>
                            <Badge
                                pill
                                variant={
                                    payment.status === "pending"
                                        ? "warning"
                                        : "success"
                                }
                            >
                                {payment.status}
                            </Badge>
                        </Col>
                        <Col>
                            {payment.status !== 'paid' && <Button onClick={() => this.openPayment(payment)} variant="primary">Pay</Button>}
                        </Col>
                    </Row>
                </Card>
            ))
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
