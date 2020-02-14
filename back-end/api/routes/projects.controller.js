// Express
const router = require("express").Router()

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
            code: 200,
            message: "No projects were found"
        }) 
    }

    // Return new user
    return res.status(200).json(projects)
})


module.exports = router
