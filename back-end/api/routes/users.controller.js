// Express
const router = require("express").Router()

// Services
const UserService = require("../../services/user.service")

/**
 * route('/current').get() Get currently logged in user
 */
router.route("/current").get(async (req, res) => {
    const { authToken } = req

    // Call to service layer - Get current user thats logged in
    const loggedInUser = await UserService.getCurrentUser(authToken).catch(error => {
        return res.status(400).json({
            code: 400,
            message: error.message
        })
    })

    // Return new user
    return res.status(200).json(loggedInUser)
})

module.exports = router
