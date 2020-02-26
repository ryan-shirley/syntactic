// Express
const router = require("express").Router()

// Services
const UserService = require("../../services/user.service")
const EmailService = require("../../services/email.service")

// Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const webhookSecret = process.env.STRIPE_INTENT_WEBHOOK_SIGNING_SECRET
const bodyParser = require("body-parser")

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
router
    .route("/webhook/stripe/payment")
    .post(bodyParser.raw({ type: "application/json" }), async (req, res) => {
        const sig = req.headers["stripe-signature"]

        let event
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
        } catch (err) {
            // On error, log and return the error message
            console.log(`❌ Error message: ${err.message}`)
            return res
                .status(400)
                .json({ error: `Webhook Error: ${err.message}` })
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
                    intent.last_payment_error &&
                    intent.last_payment_error.message
                console.log("Failed:", intent.id, message)
                break
        }

        res.status(200).json({ received: true })
    })

module.exports = router
