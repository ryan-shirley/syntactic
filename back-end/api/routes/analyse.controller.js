// Express
const router = require("express").Router()

// Services
const GoogleNLPService = require("../../services/google-nlp.service")

/**
 * route('/brief').post() Analyse brief text
 */
router.route("/brief").post(async (req, res) => {
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

module.exports = router
