// React
import React, { Component } from "react"

// Components
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm"
import DataLoading from "../components/DataLoading"
import { Card, Row, Col, Badge } from "react-bootstrap"

// Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

class BillingListComponent extends Component {
    constructor(props) {
        super(props)

        // Load all payments
        props.getAllPayments()
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
                    </Row>
                </Card>
            ))
        )

        return (
            <>
                <h2>Payments List</h2>
                {list}

                {/* <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements> */}
            </>
        )
    }
}

export default BillingListComponent
