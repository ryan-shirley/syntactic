// React
import React from "react"

// Stripe
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js"

// API Utils
import API from "../../utils/API"

// Components
import CardSection from "./CardSection"
import { Redirect } from "react-router-dom"
import { Spinner, Button, Badge } from "react-bootstrap"

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isProcessing: false,
            error: ""
        }
    }

    /**
     * handleSubmit() Handle payment submission
     */
    handleSubmit = async event => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault()

        this.setState({ isProcessing: true })

        const { stripe, elements } = this.props

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make  sure to disable form submission until Stripe.js has loaded.
            return
        }

        // Get Client Secret
        let paymentIntent = await API.get(
            `/payments/${this.props.payment._id}/intent`
        )

        const result = await stripe.confirmCardPayment(
            paymentIntent.client_secret,
            {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: this.props.name
                    }
                }
            }
        )

        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message)
            this.setState({ isProcessing: false, error: result.error.message })
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === "succeeded") {
                setTimeout(() => {
                    this.props.history.replace("/billing")
                }, 1000)
            }
        }
    }

    render() {
        let { isProcessing, error } = this.state

        if (this.props.payment && this.props.payment.status === "paid") {
            return <Redirect to="/billing" />
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <CardSection />

                {error && (
                    <Badge pill variant="danger">
                        {error}
                    </Badge>
                )}

                <br />

                <Button
                    type="submit"
                    disabled={!this.props.stripe || isProcessing}
                >
                    {isProcessing ? (
                        <>
                            Processing...
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="ml-3"
                            />
                        </>
                    ) : (
                        "Confirm order"
                    )}
                </Button>
            </form>
        )
    }
}

export default function InjectedCheckoutForm(props) {
    return (
        <ElementsConsumer>
            {({ stripe, elements }) => (
                <CheckoutForm stripe={stripe} elements={elements} payment={props.payment} name={props.name} history={props.history} />
            )}
        </ElementsConsumer>
    )
}
