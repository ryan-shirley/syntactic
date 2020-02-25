/**
 * welcomeEmail() Send welcome email
 */
exports.welcomeEmail = async user => {
    const sgMail = require("@sendgrid/mail")
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: user.email,
        from: process.env.SENDGRID_FROM_EMAIL,
        templateId: "d-df99bd7fb5e749a3a00d11219887bf9c",
        dynamic_template_data: {
            name: user.first_name,
            role: user.role[0].name
        }
    }

    await sgMail.send(msg)

    return { success: true }
}
