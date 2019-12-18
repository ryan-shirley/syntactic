var express = require("express")
var router = express.Router()

// Middlewares
import { checkIfAuthenticated } from "../middlewares/auth-middleware"

// Controllers
const writer_controller = require("../controllers/writer_controller")
const user_controller = require("../controllers/User/user_controller")

/* 
 * All Users
 */
router.get("/", checkIfAuthenticated, user_controller.getUser)
router.put("/update-bio", checkIfAuthenticated, user_controller.updateBio)
router.put("/finish-onboarding", checkIfAuthenticated, user_controller.finishOnboarding)

/**
 * Writer Routes
 */
router.get(
    "/writer/:id/categories",
    checkIfAuthenticated,
    writer_controller.getCategories
)
router.post("/writer/add-content",checkIfAuthenticated, writer_controller.addContent)

module.exports = router
