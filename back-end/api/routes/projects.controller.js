// Express
const router = require("express").Router()
const fs = require("fs")

// Middlewares
import { checkifContentSeeker } from "../middlewares/auth-middleware"
import { upload } from "../middlewares/storage.middleware"

// Services
const ProjectService = require("../../services/project.service")
const UserService = require("../../services/user.service")
const StorageService = require("../../services/storage.service")
const GoogleNLPService = require("../../services/google-nlp.service")

/**
 * route('/').get() Return all projects for user
 */
router.route("/").get(async (req, res) => {
    const { authToken } = req
    const user = req.user

    // Call to service layer - Get all users projects
    const projects = await ProjectService.getAllProjects(user).catch(error => {
        return res.status(400).json({
            code: 400,
            message: error.message
        })
    })

    // See if any projects were found
    if (!projects.length) {
        return res.status(200).json({
            code: 204,
            message: "No projects were found"
        })
    }

    // Return new project
    return res.status(200).json(projects)
})

/**
 * route('/:id').get() Return single project
 */
router.route("/:id").get(async (req, res) => {
    const { authToken } = req
    const { id } = req.params
    let user = req.user

    // Call to service layer - Get all users projects
    const project = await ProjectService.getProject(id).catch(error => {
        return res.status(400).json({
            code: 400,
            message: error.message
        })
    })

    // See if any project was found
    if (!project.title) {
        return res.status(204).json({
            code: 204,
            message: "No project was found"
        })
    }

    // Check authorised to make request
    let authorised = true
    if (
        user.role[0].name === "content seeker" &&
        project.content_seeker_id.toString() !== user._id.toString()
    ) {
        authorised = false
    } else if (
        user.role[0].name === "writer" &&
        project.writer_id.toString() !== user._id.toString()
    ) {
        authorised = false
    }

    if (!authorised) {
        return res.status(401).json({
            code: 401,
            message: "You are not authorized to make this request"
        })
    }

    // Return new user
    return res.status(200).json(project)
})

/**
 * route('/:id').put() Return updated project
 */
router.route("/:id").put(async (req, res) => {
    const { authToken } = req
    const { id } = req.params
    let user = req.user
    const updatedProjectDTO = req.body

    // Call to service layer - Get all users projects
    const project = await ProjectService.getProject(id).catch(error => {
        return res.status(400).json({
            code: 400,
            message: error.message
        })
    })

    // See if any project was found
    if (!project.title) {
        return res.status(204).json({
            code: 204,
            message: "No project was found"
        })
    }

    // Check authorised to make request
    let authorised = true
    if (
        user.role[0].name === "content seeker" &&
        project.content_seeker_id.toString() !== user._id.toString()
    ) {
        authorised = false
    } else if (
        user.role[0].name === "writer" &&
        project.writer_id.toString() !== user._id.toString()
    ) {
        authorised = false
    }

    if (!authorised) {
        return res.status(401).json({
            code: 401,
            message: "You are not authorized to make this request"
        })
    }

    // Update Project
    const updatedProject = await ProjectService.updateProject(updatedProjectDTO)

    // Return new user
    return res.status(200).json(updatedProject)
})

/**
 * route('/:id/upload/brief').post() Upload brief and analyse
 */
router
    .route("/:id/upload/brief")
    .post(upload.single("file"), async (req, res) => {
        const { authToken } = req
        const { id } = req.params
        let user = req.user

        const source = req.file.path
        const targetName = req.file.filename

        // File uploaded not supported
        if (req.file.mimetype !== "application/pdf") {
            // Remove file from local server
            fs.unlink(source, fsErr => {
                if (fsErr)
                    return res.status(500).json({
                        code: 500,
                        message: fsErr
                    })
            })

            return res.status(500).json({
                code: 500,
                message:
                    "This file type is not supported. Must be a .pdf."
            })
        }

        // Call to service layer - Get all users projects
        try {
            const oldProject = await ProjectService.getProject(id)
            // TODO: Check user is authenticated to do this..

            const text = await StorageService.getTextFromFile(source)

            // Analyse Text
            const results = await GoogleNLPService.classifyText(text)

            // Get writers for these categories
            const writers = await GoogleNLPService.getWriters(results)

            // TODO: Upload file to cloud storage
            const destination = await StorageService.uploadFileToCloudStorage(
                source,
                targetName,
                id
            )

            // // GETS PUBLIC URL
            // const myFile = admin.storage().bucket(process.env.FIREBASE_STORAGE_BUCKET).file('Research Doc.pdf')
            // await myFile.getSignedUrl({action: 'read', expires: '2020-03-03'}).then(urls => {
            //     const signedUrl = urls[0]
            //     console.log(signedUrl);

            // })

            // Update Project
            oldProject.brief = {
                path: destination,
                analysis: results
            }
            let updatedProjectDetails = oldProject
            const newProject = await ProjectService.updateProject(
                updatedProjectDetails
            )

            // Remove file from express
            fs.unlink(source, fsErr => {
                if (fsErr)
                    return res.status(500).json({
                        code: 500,
                        message: fsErr
                    })
            })

            return res.json({
                project: newProject,
                writers
            })
        } catch (error) {
            // Remove file from local server
            fs.unlink(source, fsErr => {
                if (fsErr)
                    return res.status(500).json({
                        code: 500,
                        message: fsErr
                    })
            })

            res.status(400).json({
                code: 400,
                message: error.message
            })
        }
    })

/**
 * route('/:id').get() Return single project
 */
router.route("/:id/writers").get(async (req, res) => {
    const { authToken } = req
    const { id } = req.params
    let user = req.user

    // Call to service layer - Get all users projects
    const project = await ProjectService.getProject(id).catch(error => {
        return res.status(400).json({
            code: 400,
            message: error.message
        })
    })

    // Check authorised to make request
    let authorised = true
    if (
        user.role[0].name === "content seeker" &&
        project.content_seeker_id.toString() !== user._id.toString()
    ) {
        authorised = false
    } else if (
        user.role[0].name === "writer" &&
        project.writer_id.toString() !== user._id.toString()
    ) {
        authorised = false
    }

    if (!authorised) {
        return res.status(401).json({
            code: 401,
            message: "You are not authorized to make this request"
        })
    }

    // Get writers for the project categories
    const writers = await GoogleNLPService.getWriters(project.brief.analysis)

    // Return writers
    return res.status(200).json(writers)
})

/**
 * route('/').post() Create project
 */
router.route("/").post(checkifContentSeeker, async (req, res) => {
    const projectDTO = req.body
    const user = req.user

    // Call to service layer - Business Logic
    const project = await ProjectService.create(projectDTO, user._id).catch(
        error => {
            return res.status(400).json({
                code: 400,
                message: error.message,
                fields: error.errors
            })
        }
    )

    // Return new user
    return res.status(201).json(project)
})

module.exports = router
