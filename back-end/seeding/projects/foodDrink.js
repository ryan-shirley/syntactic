const seeding_utils = require("../utils")

module.exports = function seedProjects(contentSeekers, writers) {
    // Project titles
    let titles = [
        {
            name: "Grocery Essentials For Your Pantry!",
            analysis: [
                {
                    categories: [
                        "Food & Drink",
                        "Food & Grocery Retailers"
                    ],
                    confidence: 0.74
                },
                {
                    categories: [
                        "Food & Drink",
                        "Food",
                    ],
                    confidence: 0.82
                }
            ]
        },
        {
            name: "Hero Veggies - IG Launch Series",
            analysis: [
                {
                    categories: [
                        "Food & Drink",
                        "Cooking & Recipes"
                    ],
                    confidence: 0.84
                },
                {
                    categories: [
                        "Food & Drink",
                        "Food",
                    ],
                    confidence: 0.72
                }
            ]
        },
        {
            name: "Desserts in Cozies - IG Launch Series",
            analysis: [
                {
                    categories: [
                        "Food & Drink",
                        "Cooking & Recipes",
                        "Desserts"
                    ],
                    confidence: 0.92
                },
                {
                    categories: [
                        "Food & Drink",
                        "Food",
                        "Snack Foods"
                    ],
                    confidence: 0.77
                }
            ]
        },
        {
            name: "Can't be arsed meals",
            analysis: [
                {
                    categories: [
                        "Food & Drink",
                        "Cooking & Recipes",
                    ],
                    confidence: 0.92
                },
                {
                    categories: [
                        "Food & Drink",
                        "Food",
                        "Snack Foods"
                    ],
                    confidence: 0.77
                }
            ]
        },
        {
            name: "Bucket List Foods",
            analysis: [
                {
                    categories: [
                        "Food & Drink",
                        "Cooking & Recipes",
                    ],
                    confidence: 0.58
                },
                {
                    categories: [
                        "Food & Drink",
                        "Restaurants",
                    ],
                    confidence: 0.92
                },
                {
                    categories: [
                        "Food & Drink",
                        "Beverages",
                    ],
                    confidence: 0.79
                }
            ]
        },
        {
            name: "Mocktail heaven blog post",
            analysis: [
                {
                    categories: [
                        "Food & Drink",
                        "Beverages",
                        "Soft Drinks"
                    ],
                    confidence: 0.78
                },
            ]
        },
        {
            name: "Internal drinks event notice",
            analysis: [
                {
                    categories: [
                        "Food & Drink",
                        "Beverages",
                        "Soft Drinks"
                    ],
                    confidence: 0.78
                },
                {
                    categories: [
                        "Food & Drink",
                        "Beverages",
                        "Coffee & Tea"
                    ],
                    confidence: 0.8
                },
            ]
        },
        {
            name: "25 Year old whiskey launch campaign content",
            analysis: [
                {
                    categories: [
                        "Food & Drink",
                        "Beverages",
                        "Alcoholic Beverages"
                    ],
                    confidence: 0.93
                },
            ]
        },
        {
            name: "Weekly Whiskey...?",
            analysis: [
                {
                    categories: [
                        "Food & Drink",
                        "Beverages",
                        "Alcoholic Beverages"
                    ],
                    confidence: 0.97
                },
            ]
        },
        {
            name: "Starbucks Ireland - Launching Frozen Delights",
            analysis: [
                {
                    categories: [
                        "Food & Drink",
                        "Beverages",
                        "Coffee & Tea"
                    ],
                    confidence: 0.93
                },
            ]
        },
        {
            name: "Costa Ireland IG - Launching Frozen MANGO!",
            analysis: [
                {
                    categories: [
                        "Food & Drink",
                        "Beverages",
                        "Coffee & Tea"
                    ],
                    confidence: 0.93
                },
            ]
        },
        {
            name: "Costa Ireland FB - Launching Frozen MANGO!",
            analysis: [
                {
                    categories: [
                        "Food & Drink",
                        "Beverages",
                        "Coffee & Tea"
                    ],
                    confidence: 0.93
                },
            ]
        },
        {
            name: "Costa Ireland IG - NEW cup sizes",
            analysis: [
                {
                    categories: [
                        "Food & Drink",
                        "Beverages",
                        "Coffee & Tea"
                    ],
                    confidence: 0.93
                },
            ]
        },
        {
            name: "Costa Ireland IG - Carbon Neutral Plan",
            analysis: [
                {
                    categories: [
                        "Food & Drink",
                        "Beverages",
                        "Coffee & Tea"
                    ],
                    confidence: 0.93
                },
                {
                    categories: [
                        "Food & Drink",
                        "Restaurants"
                    ],
                    confidence: 0.86
                },
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
