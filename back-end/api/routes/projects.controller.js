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
const LevelService = require("../../services/level.service")
const GoogleNLPService = require("../../services/google-nlp.service")

// Config
import admin from "../../config/firebase-service"

// MD Conversion
import * as Showdown from "showdown"
const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
})

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
        return res.status(204).json({
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
        project.content_seeker_id._id.toString() !== user._id.toString()
    ) {
        authorised = false
    } else if (
        user.role[0].name === "writer" &&
        project.writer_id._id.toString() !== user._id.toString()
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
        project.content_seeker_id._id.toString() !== user._id.toString()
    ) {
        authorised = false
    } else if (
        user.role[0].name === "writer" &&
        project.writer_id._id.toString() !== user._id.toString()
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
 * route('/:id/finish').put() Return updated finished project
 */
router.route("/:id/finish").put(checkifContentSeeker, async (req, res) => {
    const { id } = req.params
    let user = req.user
    const finalDeliverables = req.body

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
        project.content_seeker_id._id.toString() !== user._id.toString()
    ) {
        authorised = false
    }

    if (!authorised) {
        return res.status(401).json({
            code: 401,
            message: "You are not authorized to make this request"
        })
    }

    // Analyse Deliverables and add to writer
    let deliverables = project.deliverables.filter(del =>
        finalDeliverables.includes(del.id)
    )

    // Get list of pain text deliverable content
    let textToBeAnalysed = []
    for (let i = 0; i < deliverables.length; i++) {
        let markdown = deliverables[i].content

        let html = converter.makeHtml(markdown)
        let text = html.replace(/<\/?[^>]+>/gi, " ")

        textToBeAnalysed.push(text)
    }

    // Analsyse Text
    let writer_id = project.writer_id._id
    for (let i = 0; i < textToBeAnalysed.length; i++) {
        let text = textToBeAnalysed[i]

        // Call to service layer - Classify text and add results to writer in category
        const results = await GoogleNLPService.classifyText(text)
        await GoogleNLPService.addCategoriesToWriter(results, writer_id)

        // Generate levels for the writer
        let newLevels = []
        for (var l = 0; l < results.length; l++) {
            let resultGroup = results[l]

            for (let j = 0; j < resultGroup.categories.length; j++) {
                let category = resultGroup.categories[j]

                let level = await LevelService.generateLevel(
                    category,
                    writer_id
                )
                newLevels.push({
                    category,
                    level
                })
            }
        }

        // Add levels to user
        await UserService.updateLevels(newLevels, writer_id)
    }

    // Update project status
    project.status = "completed"

    // Update Project
    const updatedProject = await ProjectService.updateProject(project)

    // Return updated project
    return res.status(200).json(updatedProject)
})

/**
 * route('/:id').delete() Delete single project
 */
router.route("/:id").delete(checkifContentSeeker, async (req, res) => {
    const { authToken } = req
    const { id } = req.params
    let user = req.user

    // Call to service layer - Get project
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
        project.content_seeker_id._id.toString() !== user._id.toString()
    ) {
        authorised = false
    }

    if (!authorised) {
        return res.status(401).json({
            code: 401,
            message: "You are not authorized to make this request"
        })
    }

    // Delete Project
    await ProjectService.deleteProject(project).catch(error => {
        return res.status(400).json({
            code: 400,
            message: error.message
        })
    })

    // Return successfully deleted
    return res.json({
        code: 200,
        message: `Project with ID ${id} has been successfully deleted.`
    })
})

/**
 * route('/:id/upload/brief').post() Upload brief and analyse
 */
router
    .route("/:id/upload/brief")
    .post(upload.single("file"), async (req, res) => {
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
                message: "This file type is not supported. Must be a .pdf."
            })
        }

        // Call to service layer - Get all users projects
        try {
            const oldProject = await ProjectService.getProject(id)

            // Check authorised to make request
            let authorised = true
            if (
                oldProject.content_seeker_id._id.toString() !==
                user._id.toString()
            ) {
                authorised = false
            }

            if (!authorised) {
                return res.status(401).json({
                    code: 401,
                    message: "You are not authorized to make this request"
                })
            }

            const text = await StorageService.getTextFromFile(source)

            // Analyse Text
            const results = await GoogleNLPService.classifyText(text)

            // Get writers for these categories
            const writers = await GoogleNLPService.getWriters(results)

            // Upload file to cloud storage

            const destination = `projects/${id}/${targetName}`
            await StorageService.uploadFileToCloudStorage(
                source,
                destination
            )

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
 * route('/:id/upload/resources').post() Upload resources
 */
router
    .route("/:id/upload/resources")
    .post(upload.array("file"), async (req, res) => {
        const { id } = req.params
        let user = req.user
        let files = req.files

        // Call to service layer - Get all users projects
        try {
            const oldProject = await ProjectService.getProject(id)

            // Check authorised to make request
            let authorised = true
            if (
                oldProject.content_seeker_id._id.toString() !==
                user._id.toString()
            ) {
                authorised = false
            }

            if (!authorised) {
                return res.status(401).json({
                    code: 401,
                    message: "You are not authorized to make this request"
                })
            }

            for (var i = 0; i < files.length; i++) {
                let file = files[i]

                const source = file.path
                const targetName = file.filename
                const size = file.size
                const type = file.mimetype

                // Upload files to cloud storage
                const destination = `projects/${id}/${targetName}`
                
                await StorageService.uploadFileToCloudStorage(
                    source,
                    destination
                )

                let newFile = {
                    path: destination,
                    fileName: targetName,
                    type,
                    size
                }

                // Add resources to project
                if (oldProject.resources) {
                    oldProject.resources.push(newFile)
                } else {
                    oldProject.resources = [newFile]
                }
            }

            // Update Project
            let updatedProjectDetails = oldProject

            const newProject = await ProjectService.updateProject(
                updatedProjectDetails
            )

            // Remove files from express
            for (var i = 0; i < files.length; i++) {
                let file = files[i].path

                fs.unlink(file, fsErr => {
                    if (fsErr)
                        return res.status(500).json({
                            code: 500,
                            message: fsErr
                        })
                })
            }

            return res.json({
                project: newProject
            })
        } catch (error) {
            console.log(error)

            // Remove files from local server
            for (var i = 0; i < files.length; i++) {
                let file = files[i].path

                fs.unlink(file, fsErr => {
                    if (fsErr)
                        return res.status(500).json({
                            code: 500,
                            message: fsErr
                        })
                })
            }

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
        project.content_seeker_id._id.toString() !== user._id.toString()
    ) {
        authorised = false
    } else if (
        user.role[0].name === "writer" &&
        project.writer_id._id.toString() !== user._id.toString()
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

/**
 * route('/:id/download').get() Return url to be able to download file
 */
router.route("/:id/download").get(async (req, res) => {
    const { authToken } = req
    const { id } = req.params
    let user = req.user

    // Access Query Parameter
    let filePath = req.query.filePath

    if (!filePath) {
        return res.status(400).json({
            code: 400,
            message: "A file path query param is required."
        })
    }

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
        project.content_seeker_id._id.toString() !== user._id.toString()
    ) {
        authorised = false
    } else if (
        user.role[0].name === "writer" &&
        project.writer_id._id.toString() !== user._id.toString()
    ) {
        authorised = false
    }

    // Ensure that folder being accessed is the same as the project
    if (!filePath.includes(`/${id}/`)) {
        authorised = false
    }

    if (!authorised) {
        return res.status(401).json({
            code: 401,
            message: "You are not authorized to make this request"
        })
    }

    // Set public link duration
    var moment = require("moment")
    let expires = moment().add(20, "seconds")

    // Generate Public Url
    const myFile = admin
        .storage()
        .bucket(process.env.FIREBASE_STORAGE_BUCKET)
        .file(filePath)

    await myFile
        .getSignedUrl({ action: "read", expires })
        .then(urls => {
            const signedUrl = urls[0]

            // Return url
            return res.status(200).json(signedUrl)
        })
        .catch(error => {
            return res.status(500).json({
                code: 500,
                message: error.message
            })
        })
})

/**
 * route('/:id/messages').use() Use messages router
 */
router.use("/:id/messages", require("./messages.controller"))

/**
 * route('/:id/payments').use() Use project payments router
 */
router.use("/:id/payments", require("./projects.payments.controller"))

module.exports = router
