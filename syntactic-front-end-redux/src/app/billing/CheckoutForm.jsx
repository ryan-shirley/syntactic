// React
import React from "react"

// Stripe
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"

// API Utils
import API from "../../utils/API"

// Components
import CardSection from "./CardSection"

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
        let paymentIntent = await API.get(`/payments/${props.payment._id}/intent`)

        const result = await stripe.confirmCardPayment(paymentIntent.client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: props.name
                }
            }
        })

        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message)
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === "succeeded") {
                console.log(result);
                props.history.replace('/billing')
                
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardSection />
            <br />
            <button disabled={!stripe} className="btn btn-primary">Confirm order</button>
        </form>
    )
}
