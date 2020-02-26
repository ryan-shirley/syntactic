// React
import React, { Component } from "react"

// Components
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm"

// Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

class BillingListComponent extends Component {
    render() {
        return (
            <>
                <h2>Billing List</h2>

                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </>
        )
    }
}

export default BillingListComponent
