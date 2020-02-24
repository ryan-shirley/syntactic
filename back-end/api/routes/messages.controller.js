// Express
const router = require("express").Router({ mergeParams: true })

// Services
const MessageService = require("../../services/message.service")

/**
 * route('/').get() Return all messages for a project
 */
router.route("/").get(async (req, res) => {
    const user = req.user
    const { id } = req.params

    let messages = await MessageService.get(id)

    // Return messages
    return res.status(200).json(messages)
})

module.exports = router
