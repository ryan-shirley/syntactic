// Express
const router = require("express").Router()

// Services
const GoogleNLPService = require("../../services/google-nlp.service")
const UserService = require("../../services/user.service")
const LevelService = require("../../services/level.service")

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
    const loggedInUser = req.user
   
    try {
        // Call to service layer - Business Logic
        const results = await GoogleNLPService.classifyText(text)
        await GoogleNLPService.addCategoriesToWriter(results, loggedInUser._id)

        // Generate levels for the writer
        let newLevels = []
        for (var i = 0; i < results.length; i++) {
            let resultGroup = results[i]

            for(let j = 0; j < resultGroup.categories.length; j++) {
                let category = resultGroup.categories[j]

                let level = await LevelService.generateLevel(category, loggedInUser._id)
                newLevels.push({
                    category,
                    level
                })
            }
        }

        // Add levels to user
        let updatedUser = await UserService.updateLevels(newLevels, loggedInUser._id)
        // console.log(updatedUser);
        
        

        // Return results
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
