// Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// Model
import Payment from "../models/payments.model"

/**
 * createPaymentIntent() Create payment intent using stripe
 */
exports.createPaymentIntent = async amount => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "eur"
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
