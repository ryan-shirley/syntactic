// AWS File Uplaod
const multer = require("multer")
const fs = require("fs")

// Configure Disk Storage
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
export const upload = multer({ storage: storage })