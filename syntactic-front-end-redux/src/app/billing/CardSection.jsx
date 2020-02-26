// React
import React, { Component } from "react"

// Components
import { CardElement } from "@stripe/react-stripe-js"

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4"
            }
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    }
}

class CardSection extends Component {
    render() {
        return (
            <label>
                <CardElement options={CARD_ELEMENT_OPTIONS} />
            </label>
        )
    }
}

export default CardSection
