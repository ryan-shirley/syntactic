const mongoose = require("mongoose")

let PaymentsSchema = new mongoose.Schema(
    {
        payer_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        receiver_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        project_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Project"
        },
        amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ["pending", "payed"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
)

// Export the model
module.exports = mongoose.model("Payment", PaymentsSchema)
