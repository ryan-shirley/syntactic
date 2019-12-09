const mongoose = require('mongoose');

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
    // email: {
    //     type: String, 
    //     required: true, 
    //     unique: true,
    //     max: 100
    // },
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
    // role: {
    //     type: [RoleSchema],
    //     required: true 
    // },
    profile: {
        bio: {
            type: String, 
            required: true
        },
        business: {
            type: String, 
            required: false
        }
    },
});


// Export the model
module.exports = mongoose.model('User', UserSchema);