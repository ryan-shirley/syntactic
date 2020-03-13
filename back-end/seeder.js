require("dotenv").config()
var seeder = require("mongoose-seed")
seeder.setLogOutput(false)

// Connect to MongoDB via Mongoose
seeder.connect(process.env.MONGODB_URI_LIVE, function() {
    // Load Mongoose models
    console.log('Loading Models');
    
    seeder.loadModels(["./models/user.model.js", "./models/categories.model.js", "./models/projects.model.js"])

    // Clear specified collections
    console.log('Clearing Collections');
    seeder.clearModels(["User", "Category", "Project"], function() {
        // Callback to populate DB once collections have been cleared
        console.log('Populate Models');
        seeder.populateModels(data, async function() {

            // Generate Writer Levels
            let users = await users_seed.generateLevels(usersObj, data[0].documents)

            // Seed users
            seeder.populateModels(users, function() {
                console.log('Database Seeded Successfully');
                
                seeder.disconnect()
            })
            
        })
    })
})

// Data array containing seed data - documents organized by Model
let users_seed = require("./seeding/users-seeder")
let usersObj = users_seed.createUsers()

let main_seed = require("./seeding/main-seeder")
let data = main_seed.seedData(usersObj)