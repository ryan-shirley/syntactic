const mongoose = require("mongoose")

let RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

let LevelSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
        default: undefined
    }
})

let UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        max: 100
    },
    last_name: {
        type: String,
        required: true,
        max: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 100
    },
    // password: {
    //     type: String,
    //     required: true,
    //     max: 100
    // },
    completed_onboarding: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: [RoleSchema],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    profile: {
        bio: {
            type: String,
            required: false
        },
        business: {
            type: String,
            required: false
        }
    },
    profile_picture: {
        type: String,
        required: false
    },
    uid: {
        type: String,
        required: true,
        max: 100,
        unique: true
    },
    levels: {
        type: [LevelSchema],
        required: false,
        default: undefined
    },
})


// Export the model
module.exports = mongoose.model("User", UserSchema)
