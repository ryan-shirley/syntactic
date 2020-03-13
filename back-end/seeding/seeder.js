// Collection Seeder Functions
let seedCategories = require("./categories/categories-seeder")
let seedProjects = require("./projects/projects-seeder")

// Import Collections
let nonFirebaseContentSeekers = require("./users/content-seekers-non-firebase")
let firebaseContentSeekers = require("./users/content-seekers-firebase")
let nonFirebaseWriters = require("./users/writers-non-firebase")
let firebaseWriters = require("./users/writers-firebase")
let users = nonFirebaseContentSeekers.concat(firebaseContentSeekers, nonFirebaseWriters, firebaseWriters)

let categories = seedCategories(nonFirebaseWriters.concat(firebaseWriters))

let projects = seedProjects(firebaseContentSeekers, firebaseWriters, nonFirebaseWriters)

let data = [
    {
        model: "User",
        documents: users
    },
    {
        model: "Category",
        documents: categories
    },
    {
        model: "Project",
        documents: projects
    }
]

module.exports = data
