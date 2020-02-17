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
 * getProject() Return project
 */
exports.getProject = async _id => {
    let project = await Project.findOne({ _id }, function (err, project) {
        if (err) throw err

        return project
    })
    

    return project
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