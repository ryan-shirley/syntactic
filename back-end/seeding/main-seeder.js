// Collection Seeder Functions
let seedCategories = require("./categories/categories-seeder")
let seedProjects = require("./projects/projects-seeder")
const seeding_utils = require("./utils")

module.exports = module.exports = {
    seedData: function(users) {

        let {
            nonFirebaseContentSeekers,
            firebaseContentSeekers,
            nonFirebaseWriters,
            firebaseWriters
        } = users

        let categories = seedCategories(nonFirebaseWriters.concat(firebaseWriters))
        let projects = seedProjects(firebaseContentSeekers, firebaseWriters, nonFirebaseWriters)

        let data = [
            {
                model: "Category",
                documents: categories
            },
            {
                model: "Project",
                documents: projects
            }
        ]

        return data
    }
}
