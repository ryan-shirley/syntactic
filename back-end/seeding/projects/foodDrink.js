const seeding_utils = require("../utils")

module.exports = function seedProjects(contentSeekers, writers) {
    // Project titles
    let titles = [
        "Food and Drink :)",
    ]

    // Define Projects
    let projects = []

    // Loop though title
    for (let i = 0; i < titles.length; i++) {
        let project = seeding_utils.seedProject(
            titles[i],
            writers,
            contentSeekers,
            seeding_utils.randomProjectStatus()
        )

        // Add project
        projects.push(project)
    }

    // Return projects
    return projects
}
