// AWS File Uplaod
const multer = require("multer")

// Configure Disk Storage
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
export const upload = multer({ storage: storage })