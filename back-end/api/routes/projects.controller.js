// Express
const router = require("express").Router()

// Middlewares
import { checkifContentSeeker } from "../middlewares/auth-middleware"

// Services
const ProjectService = require("../../services/project.service")
const UserService = require("../../services/user.service")

/**
 * route('/').get() Return all projects for user
 */
router.route("/").get(async (req, res) => {
    const { authToken } = req

    // Call to service layer - Get current user thats logged in
    const user = await UserService.getCurrentUser(authToken).catch(error => {
        return res.status(400).json({
            code: 400,
            message: error.message
        })
    })

    // Call to service layer - Get all users projects
    const projects = await ProjectService.getAllProjects(user).catch(error => {
        return res.status(400).json({
            code: 400,
            message: error.message
        })
    })

    // See if any projects were found
    if(!projects.length) {
        return res.status(200).json({
            code: 204,
            message: "No projects were found"
        }) 
    }

    // Return new user
    return res.status(200).json(projects)
})

/**
 * route('/').post() Create project
 */
router.route("/").post(checkifContentSeeker, async (req, res) => {
    const projectDTO = req.body
    const user = req.user

    // Call to service layer - Business Logic
    const project = await ProjectService.create(projectDTO, user._id).catch(error => {
        return res.status(400).json({
            code: 400,
            message: error.message,
            fields: error.errors
        })
    })

    // Return new user
    return res.status(201).json(project)
})


module.exports = router
