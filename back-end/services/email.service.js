/**
 * welcomeEmail() Send welcome email
 */
exports.welcomeEmail = async user => {
    const sgMail = require("@sendgrid/mail")
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: user.email,
        from: process.env.SENDGRID_FROM_EMAIL,
        templateId: "d-0bbc2153a67c43b8bb2eb59ca86e261b",
        dynamic_template_data: {
            name: user.first_name
        }
    }

    await sgMail.send(msg)

    return { success: true }
}
