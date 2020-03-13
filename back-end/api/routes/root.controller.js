// Express
const router = require("express").Router()

// Middlewares
import { checkIfAuthenticated } from "../middlewares/auth-middleware"

// Services
const UserService = require("../../services/user.service")
const EmailService = require("../../services/email.service")
const PaymentService = require("../../services/payment.service")
const ProjectService = require("../../services/project.service")

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
                let paymentID = intent.metadata.paymentID
                await PaymentService.markPayed(paymentID)

                // Send email

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

/**
 * route('/dashboard').get() Get dashboard information
 */
router.route("/dashboard").get(checkIfAuthenticated, async (req, res) => {
    const user = req.user

    // Call to service layer
    const projects = await ProjectService.getAllProjects(user).catch(error => {
        return res.status(400).json({
            code: 400,
            message: error.message
        })
    })

    const payments = await PaymentService.getAll(user._id).catch(error => {
        return res.status(400).json({
            code: 400,
            message: error.message
        })
    })

    let weeksFromNow = new Date()
    weeksFromNow.setDate(weeksFromNow.getDate() + 3 * 14)

    let data = {
        stats: {
            activeProjects: projects.filter(p => p.status === "writing").length,
            completedProjects: projects.filter(p => p.status === "completed")
                .length,
            invitationPending: projects.filter(
                p => (p.status === "invitation pending" || p.status === "invitation rejected")
            ).length,
            billing: payments
                .filter(p => p.status === "paid")
                .reduce((acc, p) => acc + p.amount, 0)
        },
        projects: {
            invitationPending: projects.filter(
                p => (p.status === "invitation pending" || p.status === "invitation rejected")
            ),
            dueSoon: projects
                .filter(
                    p => p.end_date < weeksFromNow && p.status !== "completed"
                )
                .sort((a, b) => new Date(a.end_date) - new Date(b.end_date))
        }
    }

    // Return data
    return res.status(200).json(data)
})

module.exports = router
