const User = require("../../models/user.model")
import admin from "../../firebase-service"

/**
 * getUser() Get current logged in user
 */
exports.getUser = async (req, res) => {
    const { authToken } = req

    // Get uid for user
    const userInfo = await admin.auth().verifyIdToken(authToken)
    const uid = userInfo.uid

    User.findOne({ uid }, (err, user) => {
        if (err) return res.status(400).json(err)

        return res.status(200).json(user)
    })
}
