// Express
const router = require("express").Router({ mergeParams: true })

// Middlewares
import { checkifContentSeeker } from "../middlewares/auth-middleware"

// Services
const PaymentService = require("../../services/payment.service")

/**
 * route('/').get() Return all payments for a user
 */
router.route("/").get(async (req, res) => {
    const user = req.user

    let payments = await PaymentService.getAll(user._id)

    // Return payments
    return res.status(200).json(payments)
})

/**
 * route('/:id').get() Return single payment
 */
router.route("/:id").get(async (req, res) => {
    const { id } = req.params

    let payment = await PaymentService.getSingle(id)

    // Return payment
    return res.status(200).json(payment)
})

/**
 * route('/:id/intent').get() Generate payment intent
 */
router.route("/:id/intent").get(checkifContentSeeker, async (req, res) => {
    const { id } = req.params
    let user = req.user

    // Call to service layer - Get payment
    const payment = await PaymentService.getSingle(id).catch(error => {
        return res.status(400).json({
            code: 400,
            message: error.message
        })
    })

    // See if any project was found
    if (!payment._id) {
        return res.status(204).json({
            code: 204,
            message: "No payment was found"
        })
    }

    // Check authorised to make request
    let authorised = true
    if (
        user.role[0].name === "content seeker" &&
        payment.payer_id.toString() !== user._id.toString()
    ) {
        authorised = false
    }

    if (!authorised) {
        return res.status(401).json({
            code: 401,
            message: "You are not authorized to make this request"
        })
    }

    // Call Service layer to generate payment intent
    let paymentIntent = await PaymentService.createPaymentIntent(payment.amount)

    // Return payment intent
    return res.status(200).json(paymentIntent)
})

/**
 * route('/webhook').get() Webhook that gets run from stripe intent success or fail
 */
router.route("/webhook").get(async (req, res) => {
    const sig = req.headers["stripe-signature"]
    const endpointSecret = process.env.STRIPE_INTENT_WEBHOOK_SIGNING_SECRET

    let event
    try {
        event = stripe.webhooks.constructEvent(
            req.body.rawBody,
            sig,
            endpointSecret
        )
    } catch (err) {
        res.status(400).end()
        return
    }


    // Handle Type of webhook
    const intent = event.data.object

    switch (event.type) {
        case "payment_intent.succeeded":
            // Update database
            // Send email
            // Notify shipping department

            console.log("Succeeded:", intent.id)
            break
        case "payment_intent.payment_failed":
            const message =
                intent.last_payment_error && intent.last_payment_error.message
            console.log("Failed:", intent.id, message)
            break
    }

    res.sendStatus(200)
})

module.exports = router
