// React
import React, { Component } from "react"

// Redux
import { connect } from "react-redux"

// Components
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm"

// Actions
import { getPayment } from "../../store/actions/billingActions"

// Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

class PaymentContainer extends Component {
    constructor(props) {
        super(props)

        if (!props.payment._id) {
            props.getPayment(props.match.params.id)
        } else if (props.payment.satus === 'payed') {
            props.history.replace('/billing')
        }
        
    }
    
    /**
     * componentWillUnmount() Clear payment from redux
     */
    componentWillUnmount() {
        this.props.clearPaymentBeingPayed()
    }

    render() {
        return (
            <>
                <h2>Single Payment</h2>

                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </>
        )
    }
}

// Mapping
const mapStateToProps = state => {
    return {
        payment: state.billing.paymentBeingPayed
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearPaymentBeingPayed: () => dispatch({ type: "CLEAR_PAYMENT_BEING_PAYED" }),
        getPayment: id => dispatch(getPayment(id))
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(PaymentContainer)
