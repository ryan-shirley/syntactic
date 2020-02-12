// Express
const router = require("express").Router()

// Services
// import UserService from "../../services/user.service"
const UserService = require("../../services/user.service")

/**
 * route('/register').post() Register new user
 */
router.route("/register").post(async (req, res) => {
    const userDTO = req.body

    // Call to service layer - Business Logic
    const newUser = await UserService.signUp(userDTO).catch(error => {
        return res.status(400).json({
            code: 400,
            message: error.message,
            fields: error.errors
        })
    })

    // Return new user
    return res.status(201).json(newUser)
})

module.exports = router
