// Express
const router = require("express").Router()

// Services
const GoogleNLPService = require("../../services/google-nlp.service")
const UserService = require("../../services/user.service")

// Middlewares
import { checkifWriter, checkifContentSeeker } from "../middlewares/auth-middleware"

/**
 * route('/brief').post() Analyse brief text
 */
router.route("/brief").post(checkifContentSeeker, async (req, res) => {
    const { text } = req.body

    try {
        // Call to service layer - Business Logic
        const results = await GoogleNLPService.classifyText(text)
        const writers = await GoogleNLPService.getWriters(results)

        // Return writers
        res.status(200).json(writers)
    } catch (error) {
        console.error(error)

        res.status(400).json({
            code: 400,
            message: error.details
        })
    }
})

/**
 * route('/project').post() Analyse project
 */
router.route("/project").post(checkifWriter, async (req, res) => {
    const { text } = req.body
    const { authId: uid, authToken } = req

    // Call to service layer - Get current user thats logged in
    const loggedInUser = await UserService.getCurrentUser(authToken).catch(error => {
        return res.status(400).json({
            code: 400,
            message: error.message
        })
    })

    try {
        // Call to service layer - Business Logic
        const results = await GoogleNLPService.classifyText(text)
        await GoogleNLPService.addCategoriesToWriter(results, loggedInUser._id)

        // Return writers
        res.status(200).json({
            body: "Woo 😀! Your text has been analysed and we have updated our database with these categories.",
            categories: results
        })
    } catch (error) {
        console.error(error)

        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
})

module.exports = router
