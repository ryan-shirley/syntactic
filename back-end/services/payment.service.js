// Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// Model
import Payment from "../models/payments.model"

/**
 * createPaymentIntent() Create payment intent using stripe
 */
exports.createPaymentIntent = async (paymentID, amount) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "eur",
        metadata: { paymentID: paymentID.toString() }
    })

    return paymentIntent
}

/**
 * getAll() Return all payments for a user
 */
exports.getAll = async id => {
    return await Payment.find({
        $or: [{ payer_id: id }, { receiver_id: id }]
    }).populate('project_id', 'title end_date')
}

/**
 * getSingle() Return payment
 */
exports.getSingle = async id => {
    return await Payment.findOne({ _id: id }).populate('project_id', 'title end_date')
}

/**
 * markPayed() Mark payment as payed
 */
exports.markPayed = async id => {
    let payment = await Payment.findOne({ _id: id })

    payment.status = 'payed'

    payment.save()

    return { success: true }
}

/**
 * create() Create new payment
 */
exports.create = async (paymentDTO) => {
    try {
        // Create payment in mongo
        const payment = new Payment(paymentDTO)

        const newPayment = await payment.save()

        return newPayment
    } catch (err) {
        throw err
    }
}