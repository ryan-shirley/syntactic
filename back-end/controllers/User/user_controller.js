const User = require("../../models/user.model")
import admin from "../../firebase-service"

/**
 * getUser() Get current logged in user
 */
exports.getUser = async (req, res) => {
    const { authToken } = req

    // Get uid for user from firebase
    const userInfo = await admin.auth().verifyIdToken(authToken)
    const uid = userInfo.uid

    // Get user data from mongo
    User.findOne({ uid }, (err, user) => {
        if (err) return res.status(400).json(err)

        return res.status(200).json(user)
    })
}
