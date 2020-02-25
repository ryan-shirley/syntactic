const Project = require("../models/projects.model")

// Services
const StorageService = require("./storage.service")

/**
 * getAllProjects() Return all users projects
 */
exports.getAllProjects = async user => {
    let projects = await Project.find(
        { $or: [{ writer_id: user._id }, { content_seeker_id: user._id }] },
        function(err, projects) {
            if (err) throw err

            return projects
        }
    ).populate(
        "content_seeker_id writer_id",
        "first_name last_name profile levels role"
    )

    return projects
}

/**
 * getProject() Return project
 */
exports.getProject = async _id => {
    let project = await Project.findOne({ _id }, function(err, project) {
        if (err) throw err

        return project
    }).populate(
        "content_seeker_id writer_id",
        "first_name last_name profile levels role"
    )

    return project
}

/**
 * deleteProject() Delete project
 */
exports.deleteProject = async project => {
    // Delete project folder if files were uploaded
    if (project.brief.path) {
        let path = project.brief.path.substring(0, 33)
        await StorageService.deleteFolderFromCloudStorage(path)
    }

    // Delete Project
    await Project.deleteOne(
        {
            _id: project._id
        },
        err => {
            if (err) throw err
        }
    )

    return true
}

/**
 * create() Create new project
 */
exports.create = async (projectDTO, user_id) => {
    projectDTO.content_seeker_id = user_id

    try {
        // Create project in mongo
        const project = new Project(projectDTO)

        const newProject = await project.save()

        return newProject
    } catch (err) {
        // console.log(err.errors)
        throw err
    }
}

/**
 * updateProject() Upate project
 */
exports.updateProject = async newProjectDTO => {
    await Project.updateOne(
        { _id: newProjectDTO._id },
        newProjectDTO,
        (err, res) => {
            if (err) throw err

            return res
        }
    )

    return newProjectDTO
}
