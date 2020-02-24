const mongoose = require("mongoose")

let DeliverableSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        writer_notes: {
            type: String
        },
        content_seeker_notes: {
            type: String
        },
        status: {
            type: String,
            required: true,
            enum: ["accepted", "rejected", "pending approval"],
            default: "pending approval"
        }
    },
    {
        timestamps: true
    }
)

let ResourcesSchema = new mongoose.Schema(
    {
        path: {
            type: String,
            required: true
        },
        fileName: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

let ProjectsSchema = new mongoose.Schema({
    writer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User"
    },
    content_seeker_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: [
            "draft",
            "invitation pending",
            "invitation rejected",
            "writing",
            "writing revision",
            "waiting deliverable approval",
            "deliverable approved",
            "deliverable rejected",
            "completed"
        ],
        default: "draft"
    },
    brief: {
        type: {
            type: String,
            enum: ["text", "file"]
        },
        path: {
            type: String
        },
        text: {
            type: String
        },
        analysis: {
            type: Array,
            default: undefined
        }
    },
    resources: {
        type: [ResourcesSchema],
        default: undefined
    },
    deliverables: {
        type: [DeliverableSchema],
        default: undefined
    },
    content: {
        type: String
    },
    end_date: {
        type: Date,
        required: true
    }
})

// Export the model
module.exports = mongoose.model("Project", ProjectsSchema)
