const seeding_utils = require("../utils")

module.exports = function seedCategories(writers) {
    // Define Categories
    let categories = [
        {
            name: "Sports"
        },
        {
            name: "Animal Sports",
            _parent_category_id: "Sports"
        },
        {
            name: "College Sports",
            _parent_category_id: "Sports"
        },
        {
            name: "Combat Sports",
            _parent_category_id: "Sports"
        },
        {
            name: "Boxing",
            _parent_category_id: "Combat Sports"
        },
        {
            name: "Martial Arts",
            _parent_category_id: "Combat Sports"
        },
        {
            name: "Wrestling",
            _parent_category_id: "Combat Sports"
        },
        {
            name: "Extreme Sports",
            _parent_category_id: "Sports"
        },
        {
            name: "Drag & Street Racing",
            _parent_category_id: "Extreme Sports"
        },
        {
            name: "Fantasy Sports",
            _parent_category_id: "Sports"
        },
        {
            name: "Individual Sports",
            _parent_category_id: "Sports"
        },
        {
            name: "Cycling",
            _parent_category_id: "Individual Sports"
        },
        {
            name: "Golf",
            _parent_category_id: "Individual Sports"
        },
        {
            name: "Gymnastics",
            _parent_category_id: "Individual Sports"
        },
        {
            name: "Racquet Sports",
            _parent_category_id: "Individual Sports"
        },
        {
            name: "Skate Sports",
            _parent_category_id: "Individual Sports"
        },
        {
            name: "Track & Field",
            _parent_category_id: "Individual Sports"
        },
        {
            name: "International Sports Competitions",
            _parent_category_id: "Sports"
        },
        {
            name: "Olympics",
            _parent_category_id: "International Sports Competitions"
        },
        {
            name: "Motor Sports",
            _parent_category_id: "Sports"
        },
        {
            name: "Sporting Goods",
            _parent_category_id: "Sports"
        },
        {
            name: "Sports Memorabilia",
            _parent_category_id: "Sporting Goods"
        },
        {
            name: "Winter Sports Equipment",
            _parent_category_id: "Sporting Goods"
        },
        {
            name: "Sports Coaching & Training",
            _parent_category_id: "Sports"
        },
        {
            name: "Team Sports",
            _parent_category_id: "Sports"
        },
        {
            name: "American Football",
            _parent_category_id: "Team Sports"
        },
        {
            name: "Australian Football",
            _parent_category_id: "Team Sports"
        },
        {
            name: "Baseball",
            _parent_category_id: "Team Sports"
        },
        {
            name: "Basketball",
            _parent_category_id: "Team Sports"
        },
        {
            name: "Cheerleading",
            _parent_category_id: "Team Sports"
        },
        {
            name: "Cricket",
            _parent_category_id: "Team Sports"
        },
        {
            name: "Hockey",
            _parent_category_id: "Team Sports"
        },
        {
            name: "Rugby",
            _parent_category_id: "Team Sports"
        },
        {
            name: "Soccer",
            _parent_category_id: "Team Sports"
        },
        {
            name: "Volleyball",
            _parent_category_id: "Team Sports"
        },
        {
            name: "Water Sports",
            _parent_category_id: "Sports"
        },
        {
            name: "Surfing",
            _parent_category_id: "Water Sports"
        },
        {
            name: "Swimming",
            _parent_category_id: "Water Sports"
        },
        {
            name: "Winter Sports",
            _parent_category_id: "Sports"
        },
        {
            name: "Ice Skating",
            _parent_category_id: "Winter Sports"
        },
        {
            name: "Skiing & Snowboarding",
            _parent_category_id: "Winter Sports"
        },
    ]

    // Seed categories with users and correct parent reference
    return seeding_utils.seedCategories(categories, writers)
}
