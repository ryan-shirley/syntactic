// React
import React from "react"

// Stripe
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"

// API Utils
import API from "../../utils/API"

// Components
import CardSection from "./CardSection"
import  { Redirect } from "react-router-dom"

export default function CheckoutForm(props) {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async event => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }

        // Get Client Secret
        let paymentIntent = await API.get(
            `/payments/${props.payment._id}/intent`
        )

        const result = await stripe.confirmCardPayment(
            paymentIntent.client_secret,
            {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: props.name
                    }
                }
            }
        )

        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message)
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === "succeeded") {
                // Wait for stripe webhook to notify to update payment
                setTimeout(() => {
                    props.history.replace("/billing")
                }, 500)
            }
        }
    }

    // Redirect if payment payes
    if(props.payment && props.payment.status === 'paid') {
        return <Redirect to="/billing" />
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardSection />
            <br />
            <button disabled={!stripe} className="btn btn-primary">
                Confirm order
            </button>
        </form>
    )
}
