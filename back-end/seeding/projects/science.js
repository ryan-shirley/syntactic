const seeding_utils = require("../utils")

module.exports = function seedProjects(contentSeekers, writers) {
    // Project titles
    let titles = [
        {
            name: "Philips Brilliance 439P9H monitor",
            analysis: [
                {
                    categories: [
                        "Science",
                        "Computer Science"
                    ],
                    confidence: 0.64
                },
                {
                    categories: [
                        "Computers & Electronics",
                        "Computer Hardware",
                        "Computer Peripherals"
                    ],
                    confidence: 0.92
                }
            ]
        },
        {
            name: "4 IG Posts - Best tool for Computer Science Students!",
            analysis: [
                {
                    categories: [
                        "Science",
                        "Computer Science"
                    ],
                    confidence: 0.54
                },
                {
                    categories: [
                        "Computers & Electronics",
                        "Computer Hardware"
                    ],
                    confidence: 0.7
                },
                {
                    categories: [
                        "Computers & Electronics",
                        "Software"
                    ],
                    confidence: 0.8
                }
            ]
        },
        {
            name: "Top 5 laptops for students",
            analysis: [
                {
                    categories: [
                        "Computers & Electronics",
                        "Computer Hardware",
                        "Laptops & Notebooks"
                    ],
                    confidence: 0.95
                }
            ]
        },
        {
            name: "How will Robots impact our lives in the future?",
            analysis: [
                {
                    categories: [
                        "Science",
                        "Engineering & Technology",
                        "Robotics"
                    ],
                    confidence: 0.7
                },
            ]
        },
        {
            name: "Engineering inside our business",
            analysis: [
                {
                    categories: [
                        "Science",
                        "Engineering & Technology"
                    ],
                    confidence: 0.7
                }
            ]
        }
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
