// React
import React, { Component } from "react"

// Components
import DataLoading from "../components/DataLoading"
import PaymentsGraph from "../components/PaymentsGraph"
import PaymentsList from "../components/PaymentsList"

class Earnings extends Component {
    constructor(props) {
        super(props)

        // Load all earnings
        props.getAllEarnings()
    }

    render() {
        let { payments, isLoadingdata } = this.props.billing

        let paymentGraph = isLoadingdata ? <DataLoading /> : (
            <PaymentsGraph payments={payments} />
        )

        let paymentsList = isLoadingdata ? <DataLoading /> : (
            <PaymentsList payments={payments} canPay={false} history={this.props.history} />
        )

        return (
            <>
                <h2 className="mb-3">Earnings</h2>
                {paymentGraph}

                <h3 className="mb-3">All Payments</h3>
                {paymentsList}
            </>
        )
    }
}

export default Earnings
