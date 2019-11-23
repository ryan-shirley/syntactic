const User = require('../models/user.model');

//Simple version, without validation or sanitation
exports.create_writer = async function (req, res) {

    // Create new user
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name
    })
    
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};