const seeding_utils = require("../utils")

module.exports = function seedProjects(contentSeekers, writers) {
    // Project titles
    let titles = [
        "Philips Brilliance 439P9H monitor",
        "4 IG Posts - Best tool for Computer Science Students!",
        "Top 5 laptops for students",
        "How will Robots impact our lives in the future?",
        "Engineering inside our business"
    ]

    // Define Projects
    let projects = []

    // Loop though title
    for (let i = 0; i < titles.length; i++) {
        let project = seeding_utils.seedProject(
            titles[i],
            writers,
            contentSeekers,
            "completed"
        )

        // Add project
        projects.push(project)
    }

    // Return projects
    return projects
}
