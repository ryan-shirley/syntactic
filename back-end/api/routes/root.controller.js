// Express
const router = require("express").Router()

// Services
const UserService = require("../../services/user.service")
const EmailService = require("../../services/email.service")

// Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

/**
 * route('/register').post() Register new user
 */
router.route("/register").post(async (req, res) => {
    const userDTO = req.body

    // Call to service layer - Business Logic
    const newUser = await UserService.signUp(userDTO).catch(error => {
        return res.status(400).json({
            code: 400,
            message: error.message,
            fields: error.errors
        })
    })

    // Send signup email
    await EmailService.welcomeEmail(newUser)

    // Return new user
    return res.status(201).json(newUser)
})

/**
 * route('/webhook/stripe/payment').post() Webhook that gets run from stripe intent success or fail
 */
router.route("/webhook/stripe/payment").post(async (req, res) => {
    const sig = req.headers["stripe-signature"]
    const endpointSecret = process.env.STRIPE_INTENT_WEBHOOK_SIGNING_SECRET
    let event
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
    } catch (err) {
        res.status(400).json({ error: err.message })
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

    res.status(200).json({ success: true })
})

module.exports = router
