const mongoose = require("mongoose")

let MessagesSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project'
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

// Export the model
module.exports = mongoose.model("Message", MessagesSchema)