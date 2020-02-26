const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

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
