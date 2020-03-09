// React
import React, { Component } from "react"

// Components
import DataLoading from "../components/DataLoading"
import PaymentsGraph from "./PaymentsGraph"
import PaymentsList from "./PaymentsList"

class BillingComponent extends Component {
    constructor(props) {
        super(props)

        // Load all payments
        props.getAllPayments()
    }

    render() {
        let { payments, isLoadingdata } = this.props.billing

        let paymentGraph = isLoadingdata ? <DataLoading /> : (
            <PaymentsGraph payments={payments} />
        )

        let paymentsList = isLoadingdata ? <DataLoading /> : (
            <PaymentsList payments={payments} setPaymentBeingPayed={this.props.setPaymentBeingPayed} history={this.props.history} />
        )

        return (
            <>
                <h2 className="mb-3">Billing</h2>
                {paymentGraph}

                <h3 className="mb-3">All Payments</h3>
                {paymentsList}
            </>
        )
    }
}

export default BillingComponent
