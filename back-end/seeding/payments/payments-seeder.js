module.exports = function seedPayments(projects) {
    let seededPayments = []

    // Loop Project
    for (let i = 0; i < projects.length; i++) {
        let project = projects[i]

        // If correct status add payment
        let payment_status = null

        if (project.status === "writing") {
            payment_status = "pending"
        } else if (project.status === "completed") {
            payment_status = "paid"
        }

        if (payment_status) {
            let payment = {
                status: payment_status,
                project_id: project._id,
                payer_id: project.content_seeker_id,
                receiver_id: project.writer_id,
                amount: project.amount,
                createdAt: project.createdAt
            }

            seededPayments.push(payment)
        }
    }

    return seededPayments
}
