const seeding_utils = require("../utils")

module.exports = function seedCategories(writers) {
    // Define Categories
    let categories = [
        {
            name: "Computers & Electronics"
        },
        {
            name: "CAD & CAM",
            _parent_category_id: "Computers & Electronics"
        },
        {
            name: "Computer Hardware",
            _parent_category_id: "Computers & Electronics"
        },
        {
            name: "Computer Components",
            _parent_category_id: "Computer Hardware"
        },
        {
            name: "Computer Drives & Storage",
            _parent_category_id: "Computer Hardware"
        },
        {
            name: "Computer Peripherals",
            _parent_category_id: "Computer Hardware"
        },
        {
            name: "Desktop Computers",
            _parent_category_id: "Computer Hardware"
        },
        {
            name: "Laptops & Notebooks",
            _parent_category_id: "Computer Hardware"
        },
        {
            name: "Computer Security",
            _parent_category_id: "Computers & Electronics"
        },
        {
            name: "Hacking & Cracking",
            _parent_category_id: "Computer Security"
        },
        {
            name: "Consumer Electronics",
            _parent_category_id: "Computers & Electronics"
        },
        {
            name: "Audio Equipment",
            _parent_category_id: "Consumer Electronics"
        },
        {
            name: "Camera & Photo Equipment",
            _parent_category_id: "Consumer Electronics"
        },
        {
            name: "Car Electronics",
            _parent_category_id: "Consumer Electronics"
        },
        {
            name: "Game Systems & Consoles",
            _parent_category_id: "Consumer Electronics"
        },
        {
            name: "TV & Video Equipment",
            _parent_category_id: "Consumer Electronics"
        },
        {
            name: "Enterprise Technology",
            _parent_category_id: "Computers & Electronics"
        },
        {
            name: "Data Management",
            _parent_category_id: "Enterprise Technology",
            users: []
        },
        {
            name: "Programming",
            _parent_category_id: "Computers & Electronics"
        },
        {
            name: "Java (Programming Language)",
            _parent_category_id: "Programming"
        },
        {
            name: "Software",
            _parent_category_id: "Computers & Electronics",
            users: []
        },
        {
            name: "Business & Productivity Software",
            _parent_category_id: "Software"
        },
        {
            name: "Device Drivers",
            _parent_category_id: "Software"
        },
        {
            name: "Internet Software",
            _parent_category_id: "Software"
        },
        {
            name: "Multimedia Software",
            _parent_category_id: "Software",
            users: []
        },
        {
            name: "Operating Systems",
            _parent_category_id: "Software"
        },
        {
            name: "Software Utilities",
            _parent_category_id: "Software"
        },
    ]

    // Seed categories with users and correct parent reference
    return seeding_utils.seedCategories(categories, writers)
}
