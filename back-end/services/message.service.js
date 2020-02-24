const Message = require("../models/messages.model")
const Project = require("../models/projects.model")

/**
 * get() Return all messages in a project
 */
exports.get = async project_id => {
    // Get messages
    return await Message.find({
        project_id
    }).populate('sender_id receiver_id', 'first_name last_name')
}

/**
 * save() Save message to mongo
 */
exports.save = async data => {
    // Create message in mongo
    const {
        project_id,
        sender_id
    } = data

    // Get project to find receiver
    let project = await Project.findOne({
        _id: project_id
    })

    let {
        content_seeker_id,
        writer_id
    } = project

    if (sender_id === content_seeker_id) {
        data.receiver_id = writer_id
    } else {
        data.receiver_id = content_seeker_id
    }

    const message = new Message(data)
    const newMessage = await message.save()

    return newMessage
}