const seeding_utils = require("../utils")

module.exports = function seedCategories(writers) {
    // Define Categories
    let categories = [
        {
            name: "Science"
        },
        {
            name: "Computer Science",
            _parent_category_id: "Science"
        },
        {
            name: "Engineering & Technology",
            _parent_category_id: "Science"
        },
        {
            name: "Robotics",
            _parent_category_id: "Engineering & Technology"
        }
    ]

    // Seed categories with users and correct parent reference
    return seeding_utils.seedCategories(categories, writers)
}
