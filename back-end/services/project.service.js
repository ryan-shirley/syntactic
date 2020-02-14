const Project = require("../models/categories.model")

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