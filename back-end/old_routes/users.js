var express = require("express")
var router = express.Router()

// Middlewares
import { checkIfAuthenticated, checkifWriter, checkifContentSeeker } from "../api/middlewares/auth-middleware"

// Controllers
const writer_controller = require("../controllers/Writer/writer_controller")
const user_controller = require("../controllers/User/user_controller")

/**
 * Writer Routes
 */
router.get(
    "/writer/:id/categories",
    checkifWriter,
    writer_controller.getCategories
)
router.post("/writer/add-content",checkIfAuthenticated, writer_controller.addContent)


module.exports = router
