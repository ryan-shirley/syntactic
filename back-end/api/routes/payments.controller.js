// Express
const router = require("express").Router({ mergeParams: true })

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

module.exports = router
