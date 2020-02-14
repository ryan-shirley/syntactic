const Project = require("../models/projects.model")

/**
 * getAllProjects() Return all users projects
 */
exports.getAllProjects = async user => {
    let projects = await Project.find({ $or:[{ writer_id: user._id },{ content_seeker_id: user._id }] }, function (err, projects) {
        if (err) throw err
        
        return projects
    })

    return projects
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