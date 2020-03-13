var faker = require("faker")
const seeding_utils = require("../utils")

module.exports = function seedMessages(projects) {
    let seededMessages = []

    // Loop Projects
    for (let i = 0; i < projects.length; i++) {
        let project = projects[i]

        // Check if project has been created with writer
        if (project.status === "writing" || project.status === "completed") {
            // Loop for how many messages
            let numMessages = seeding_utils.randomNumber(6, 25)

            for (let j = 0; j < numMessages; j++) {
                // Randomise who sent message
                let didWriterSend = faker.random.boolean(),
                    sender_id = didWriterSend
                        ? project.writer_id
                        : project.content_seeker_id,
                    receiver_id = didWriterSend
                        ? project.content_seeker_id
                        : project.writer_id

                // Create Message
                let message = {
                    project_id: project._id,
                    sender_id,
                    receiver_id,
                    message: faker.lorem.sentence(),
                    createdAt: project.createdAt
                }

                // Add message to list
                seededMessages.push(message)
            }
        }
    }

    return seededMessages
}
