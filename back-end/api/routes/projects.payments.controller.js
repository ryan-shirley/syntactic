// Express
const router = require("express").Router({ mergeParams: true })

// Middlewares
import { checkifContentSeeker } from "../middlewares/auth-middleware"

// Services
const PaymentService = require("../../services/payment.service")

/**
 * route('/').post() Create payment
 */
router.route("/").post(async (req, res) => {
    const project = req.body
    const paymentDTO = {
        payer_id: project.content_seeker_id,
        receiver_id: project.writer_id,
        project_id: project._id,
        amount: 400.00,
    }

    let payment = await PaymentService.create(paymentDTO).catch(error => {
        return res.status(400).json({
            code: 400,
            message: error.message
        })
    })

    // Return payment
    return res.status(201).json(payment)
})

/**
 * route('/intent').get() Generate payment intent
 */
router
    .route("/intent")
    .get(checkifContentSeeker, async (req, res) => {
        const { id } = req.params
        let user = req.user

        // Call to service layer - Get all users projects
        const project = await ProjectService.getProject(id).catch(error => {
            return res.status(400).json({
                code: 400,
                message: error.message
            })
        })

        // See if any project was found
        if (!project.title) {
            return res.status(204).json({
                code: 204,
                message: "No project was found"
            })
        }

        // Check authorised to make request
        let authorised = true
        if (
            user.role[0].name === "content seeker" &&
            project.content_seeker_id._id.toString() !== user._id.toString()
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
        // TODO: Add project amount in here
        let paymentIntent = await PaymentService.createPaymentIntent(400.0)

        // Return payment intent
        return res.status(200).json(paymentIntent)
    })

module.exports = router
