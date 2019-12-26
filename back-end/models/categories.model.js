const mongoose = require("mongoose")

let UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    articles_written: {
        type: Number,
        required: true
    },
    confidence: {
        type: Number,
        required: true
    }
})

let CategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    _parent_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    users: {
        type: [UserSchema],
        required: false
    }
})

// Export the model
module.exports = mongoose.model("Category", CategoriesSchema)
