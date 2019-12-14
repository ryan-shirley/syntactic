const User = require("../models/user.model")
import admin from "../firebase-service"

/**
 * signUp() Saves new user into Monogo
 */
exports.signUp = async (req, res) => {
    const { first_name, last_name, email, password, uid } = req.body

    try {
        // TODO: Set additional information for user like role
        // const user = await req.body.updateProfile({
        //     displayName: `First Last`
        // });

        // Create new user in Mongo DB
        const mongoUser = new User({
            first_name,
            last_name,
            email,
            completed_onboarding: false,
            uid
        })

        const newUser = await mongoUser.save()
        

        return res.status(201).json(newUser)
    } catch (err) {
        // TODO: Handle Errors here
        console.log(err)

        console.log(err.errorInfo.message)

        res.status(400).json({ message: err.errorInfo.message })
    }
}
