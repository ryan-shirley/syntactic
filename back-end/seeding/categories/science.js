const seeding_utils = require("../utils")

module.exports = function seedCategories(writers) {
    // Define Categories
    let categories = [
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

    // Seed categories with users and correct parent reference
    return seeding_utils.seedCategories(categories, writers)
}
