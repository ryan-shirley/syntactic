// Express
const router = require("express").Router({ mergeParams: true })

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
        amount: project.amount,
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

module.exports = router
