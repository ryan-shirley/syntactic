const User = require('../models/user.model');

// Simple version, without validation or sanitation
exports.onboard_content_seeker = async function (req, res) {

    try {
        const updatedUser = await User.updateOne({ email: 'stephen.white@gmail.com' }, {
            completed_onboarding: true,
            profile: {
                bio: req.body.bio,
                business: req.body.business
            }
        });
        res.json(updatedUser)
    } catch {
        res.status(400).json({ message: err.message })
    }

};