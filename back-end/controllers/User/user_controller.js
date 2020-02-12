const User = require("../../models/user.model")
import admin from "../../config/firebase-service"

/**
 * updateBio() Update the users bio
 */
exports.updateBio = async (req, res) => {
    const { authToken } = req
    const { newBio } = req.body

    // Get uid for user from firebase
    const userInfo = await admin.auth().verifyIdToken(authToken)
    const uid = userInfo.uid

    User.findOneAndUpdate(
        { uid },
        {"profile.bio": newBio},
        (err, doc) => {
            if (err) return res.send(500, { error: err })
            return res.status(200).json("Succesfully updated bio.")
        }
    )
}

/**
 * updateBusinessDescription() Update the users business description
 */
exports.updateBusinessDescription = async (req, res) => {
    const { authToken } = req
    const { newDesc } = req.body

    // Get uid for user from firebase
    const userInfo = await admin.auth().verifyIdToken(authToken)
    const uid = userInfo.uid

    User.findOneAndUpdate(
        { uid }, 
        {"profile.business": newDesc},
        (err, doc) => {
            if (err) return res.send(500, { error: err })
            return res.status(200).json("Succesfully updated business description.")
        }
    )
}

/**
 * finishOnboarding() Update user onboarding status to complete
 */
exports.finishOnboarding = async (req, res) => {
    const { authToken } = req

    // Get uid for user from firebase
    const userInfo = await admin.auth().verifyIdToken(authToken)
    const uid = userInfo.uid

    User.findOneAndUpdate(
        { uid },
        { completed_onboarding: true },
        (err, doc) => {
            if (err) return res.send(500, { error: err })
            return res.status(200).json("Succesfully completed onboarding.")
        }
    )
}