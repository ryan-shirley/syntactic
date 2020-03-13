require("dotenv").config()
var seeder = require("mongoose-seed")

// Connect to MongoDB via Mongoose
seeder.connect(process.env.MONGODB_URI_LIVE, function() {
    // Load Mongoose models
    seeder.loadModels(["./models/user.model.js", "./models/categories.model.js", "./models/projects.model.js"])

    // Clear specified collections
    seeder.clearModels(["User", "Category", "Project"], function() {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function() {
            
            seeder.disconnect()
        })
    })
})

// Data array containing seed data - documents organized by Model
var data = require("./seeding/seeder")
