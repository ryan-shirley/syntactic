const User = require("../models/user.model")
import admin from "../config/firebase-service"

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

/**
 * getCurrentUser() Get currently logged in user
 */
exports.getCurrentUser = async (authToken) => {
    try {
        // Get uid for user from firebase
        const userInfo = await admin.auth().verifyIdToken(authToken)
        const uid = userInfo.uid

        // Get user data from mongo
        return await User.findOne({ uid })
    } catch (err) {
        console.log(err)
        throw err
    }
}
