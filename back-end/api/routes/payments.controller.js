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
    let paymentIntent = await PaymentService.createPaymentIntent(payment._id, payment.amount)

    // Return payment intent
    return res.status(200).json(paymentIntent)
})

module.exports = router
