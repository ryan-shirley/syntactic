const seeding_utils = require("../utils")
var faker = require("faker")

module.exports = function seedCategories(writers) {
    let seededCategories = [
        {
            _id: seeding_utils.generateMongoObjectId(),
            name: "Science",
            users: []
        },
        {
            _id: seeding_utils.generateMongoObjectId(),
            name: "Computer Science",
            _parent_category_id: "Science",
            users: []
        },
        {
            _id: seeding_utils.generateMongoObjectId(),
            name: "Engineering & Technology",
            _parent_category_id: "Science",
            users: []
        },
        {
            _id: seeding_utils.generateMongoObjectId(),
            name: "Robotics",
            _parent_category_id: "Engineering & Technology",
            users: []
        }
    ]

    // Update _parent_category_id referance and add writers
    for (let i = 0; i < seededCategories.length; i++) {
        let category = seededCategories[i]

        // Replace string with ObjectId
        if (category.hasOwnProperty("_parent_category_id")) {
            let parentName = category._parent_category_id

            for (let j = 0; j < seededCategories.length; j++) {
                let cat = seededCategories[j]

                if (parentName === cat.name) {
                    seededCategories[i]._parent_category_id = cat._id
                }
            }
        }

        // Add Writers to categories
        for (let k = 0; k < writers.length; k++) {
            // Random if they get added or not
            if (faker.random.boolean()) {
                let user = writers[k]

                ;(articles_written = seeding_utils.randomNumber(1, 12)),
                    (confidencePercent = seeding_utils.randomNumber(90, 55))

                seededCategories[i].users.push({
                    user: user._id,
                    articles_written,
                    confidence: articles_written * (confidencePercent / 100)
                })
            }
        }
    }

    return seededCategories
}
