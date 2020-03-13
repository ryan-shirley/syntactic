const seeding_utils = require("../utils")

module.exports = function seedProjects(contentSeekers, writers) {
    // Project titles
    let titles = [
        {
            name: "Apple - Mac Pro Website",
            analysis: [
                {
                    categories: [
                        "Computers & Electronics",
                        "Computer Hardware",
                        "Computer Peripherals"
                    ],
                    confidence: 0.94
                },
                {
                    categories: [
                        "Computers & Electronics",
                        "Consumer Electronics",
                    ],
                    confidence: 0.73
                }
            ]
        },
        {
            name: "Apple - Mac Pro in store brochures",
            analysis: [
                {
                    categories: [
                        "Computers & Electronics",
                        "Computer Hardware",
                        "Computer Peripherals"
                    ],
                    confidence: 0.94
                },
                {
                    categories: [
                        "Computers & Electronics",
                        "Consumer Electronics",
                    ],
                    confidence: 0.73
                }
            ]
        },
        {
            name: "Apple - Mac Pro IG Release Campaign",
            analysis: [
                {
                    categories: [
                        "Computers & Electronics",
                        "Computer Hardware",
                        "Computer Peripherals"
                    ],
                    confidence: 0.94
                },
                {
                    categories: [
                        "Computers & Electronics",
                        "Consumer Electronics",
                    ],
                    confidence: 0.73
                }
            ]
        },
        {
            name: "Canon R5 - IG Release Posts (12 total)",
            analysis: [
                {
                    categories: [
                        "Computers & Electronics",
                        "Consumer Electronics",
                        "Camera & Photo Equipment"
                    ],
                    confidence: 0.95
                },
                {
                    categories: [
                        "Computers & Electronics",
                        "Computer Hardware"
                    ],
                    confidence: 0.68
                }
            ]
        },
        {
            name: "Red Cinema new sensor",
            analysis: [
                {
                    categories: [
                        "Computers & Electronics",
                        "Computer Hardware",
                        "Computer Components"
                    ],
                    confidence: 0.81
                },
                {
                    categories: [
                        "Computers & Electronics",
                        "Computer Hardware",
                        "Computer Drives & Storage"
                    ],
                    confidence: 0.68
                },
                {
                    categories: [
                        "Computers & Electronics",
                        "Consumer Electronics",
                        "Camera & Photo Equipment"
                    ],
                    confidence: 0.95
                }
            ]
        },
        {
            name: "Sony A8",
            analysis: [
                {
                    categories: [
                        "Computers & Electronics",
                        "Computer Hardware",
                        "Computer Components"
                    ],
                    confidence: 0.81
                },
                {
                    categories: [
                        "Computers & Electronics",
                        "Computer Hardware",
                        "Computer Drives & Storage"
                    ],
                    confidence: 0.68
                },
                {
                    categories: [
                        "Computers & Electronics",
                        "Consumer Electronics",
                        "Camera & Photo Equipment"
                    ],
                    confidence: 0.95
                }
            ]
        },
        {
            name: "Sony A8 -R",
            analysis: [
                {
                    categories: [
                        "Computers & Electronics",
                        "Computer Hardware",
                        "Computer Components"
                    ],
                    confidence: 0.81
                },
                {
                    categories: [
                        "Computers & Electronics",
                        "Computer Hardware",
                        "Computer Drives & Storage"
                    ],
                    confidence: 0.68
                },
                {
                    categories: [
                        "Computers & Electronics",
                        "Consumer Electronics",
                        "Camera & Photo Equipment"
                    ],
                    confidence: 0.95
                }
            ]
        },
        {
            name: "Canon M50 - Influencer Pack",
            analysis: [
                {
                    categories: [
                        "Computers & Electronics",
                        "Computer Hardware",
                        "Computer Components"
                    ],
                    confidence: 0.81
                },
                {
                    categories: [
                        "Computers & Electronics",
                        "Computer Hardware",
                        "Computer Drives & Storage"
                    ],
                    confidence: 0.68
                },
                {
                    categories: [
                        "Computers & Electronics",
                        "Consumer Electronics",
                        "Camera & Photo Equipment"
                    ],
                    confidence: 0.95
                }
            ]
        },
        {
            name: "Best budget travel camera - Canon M50",
            analysis: [
                {
                    categories: [
                        "Computers & Electronics",
                        "Computer Hardware",
                        "Computer Components"
                    ],
                    confidence: 0.81
                },
                {
                    categories: [
                        "Computers & Electronics",
                        "Computer Hardware",
                        "Computer Drives & Storage"
                    ],
                    confidence: 0.68
                },
                {
                    categories: [
                        "Computers & Electronics",
                        "Consumer Electronics",
                        "Camera & Photo Equipment"
                    ],
                    confidence: 0.95
                }
            ]
        },
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
