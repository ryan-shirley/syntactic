const User = require("../models/user.model")

/**
 * signUp() Saves new user into Monogo
 */
exports.signUp = async userDTO => {
    const { first_name, last_name, email, uid, role } = userDTO

    try {
        // Create new user in Mongo DB
        const mongoUser = new User({
            first_name,
            last_name,
            email,
            completed_onboarding: false,
            uid,
            role: [
                {
                    name: role
                }
            ]
        })

        const newUser = await mongoUser.save()

        return newUser
    } catch (err) {
        console.log(err.errors)
        throw err
    }
}
