// Collection Seeder Functions
let seedCategories = require("./categories/categories-seeder")

// Import Collections
let nonFirebaseContentSeekers = require("./users/content-seekers-non-firebase")
let nonFirebaseWriters = require("./users/writers-non-firebase")
let categories = seedCategories(nonFirebaseWriters)

let data = [
    {
        model: "User",
        documents: nonFirebaseContentSeekers.concat(nonFirebaseWriters)
    },
    {
        model: "Category",
        documents: categories
    }
]

module.exports = data
