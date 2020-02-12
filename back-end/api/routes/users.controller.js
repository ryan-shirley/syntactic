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

/**
 * route('/:id').patch() Partly update user profile
 */
router.route("/:id").patch(async (req, res) => {
    const { authToken } = req
    const { id } = req.params
    const userDTO = req.body

    try {
        const oldUser = await UserService.getUser(id)
        
        // User not found
        if(!oldUser) {
            return res.status(404).json({
                code: 404,
                message: 'No user with the provided id was found!'
            })
        }

        // Make sure same user updating
        if(oldUser.uid !== req.authId) {
            return res.status(403).json({
                code: 403,
                message: 'You are not authorised to do this!'
            })
        }

        // Update User
        const updatedUser = await UserService.patchUpdate(oldUser, userDTO)

        // Return updated user
        return res.status(200).json(updatedUser)
    } catch (err) {
        return res.status(err.code).json({
            code: err.code,
            message: err.message
        })
    }
    

    // // Call to service layer - Get current user thats logged in
    // const loggedInUser = await UserService.getCurrentUser(authToken).catch(error => {
    //     return res.status(400).json({
    //         code: 400,
    //         message: error.message
    //     })
    // })
})

module.exports = router
