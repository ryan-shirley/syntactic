// Express
const router = require("express").Router()
const fs = require("fs")

// Services
const UserService = require("../../services/user.service")
const StorageService = require("../../services/storage.service")

// Middleware
import { upload } from "../middlewares/storage.middleware"

/**
 * route('/current').get() Get currently logged in user
 */
router.route("/current").get(async (req, res) => {
    // Return new user
    return res.status(200).json(req.user)
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

/**
 * route('/:id').put() Update user profile
 */
router.route("/:id").put(upload.single("file"), async (req, res) => {
    const { id } = req.params
    const currentUser = req.user
    let userDTO = req.body

    // Parse object
    for (const property in userDTO) {
        userDTO[property] = JSON.parse(userDTO[property])
    }

    // Profile picture
    const fileUploaded = req.file ? true : false
    let source, targetName
    if (fileUploaded) {
        source = req.file.path
        targetName = req.file.filename
    }

    try {
        // Make sure same user updating
        if(currentUser.uid !== req.authId || id !== currentUser._id.toString()) {
            return res.status(403).json({
                code: 403,
                message: 'You are not authorised to do this!'
            })
        }

        if (fileUploaded) {
            // Upload file to cloud & Add profile picture to user
            userDTO.profile_picture = await StorageService.uploadFileToCloudStorage(
                source, `users/${id}`
            )

            // Remove file from express
            fs.unlink(source, fsErr => {
                if (fsErr)
                    return res.status(500).json({
                        code: 500,
                        message: fsErr
                    })
            })
        }

        // Update User
        const updatedUser = await UserService.update(userDTO)

        // Return updated user
        return res.status(200).json(updatedUser)
    } catch (err) {
        return res.status(err.code).json({
            code: err.code,
            message: err.message
        })
    }
})

module.exports = router
