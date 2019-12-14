var express = require("express")
var router = express.Router()
import { checkIfAuthenticated } from "../middlewares/auth-middleware"

const writer_controller = require("../controllers/writer_controller")
const user_controller = require("../controllers/User/user_controller")

/* Get current user */
router.get("/", checkIfAuthenticated, user_controller.getUser)

/* POST Writer add text. */
router.post("/writer/newText", writer_controller.addText)
router.get(
    "/writer/:id/categories",
    checkIfAuthenticated,
    writer_controller.getCategories
)

module.exports = router
