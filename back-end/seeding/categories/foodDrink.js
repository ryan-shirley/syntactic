const seeding_utils = require("../utils")

module.exports = function seedCategories(writers) {
    // Define Categories
    let categories = [
        {
            name: "Food & Drink"
        },
        {
            name: "Beverages",
            _parent_category_id: "Food & Drink"
        },
        {
            name: "Alcoholic Beverages",
            _parent_category_id: "Beverages"
        },
        {
            name: "Coffee & Tea",
            _parent_category_id: "Beverages"
        },
        {
            name: "Juice",
            _parent_category_id: "Beverages"
        },
        {
            name: "Soft Drinks",
            _parent_category_id: "Beverages"
        },
        {
            name: "Cooking & Recipes",
            _parent_category_id: "Food & Drink"
        },
        {
            name: "BBQ & Grilling",
            _parent_category_id: "Cooking & Recipes"
        },
        {
            name: "Desserts",
            _parent_category_id: "Cooking & Recipes"
        },
        {
            name: "Soups & Stews",
            _parent_category_id: "Cooking & Recipes"
        },
        {
            name: "Food",
            _parent_category_id: "Food & Drink"
        },
        {
            name: "Food & Grocery Retailers",
            _parent_category_id: "Food & Drink"
        },
        {
            name: "Baked Goods",
            _parent_category_id: "Food"
        },
        {
            name: "Breakfast Foods",
            _parent_category_id: "Food"
        },
        {
            name: "Candy & Sweets",
            _parent_category_id: "Food"
        },
        {
            name: "Grains & Pasta",
            _parent_category_id: "Food"
        },
        {
            name: "Meat & Seafood",
            _parent_category_id: "Food"
        },
        {
            name: "Snack Foods",
            _parent_category_id: "Food"
        },
        {
            name: "Restaurants",
            _parent_category_id: "Food & Drink"
        },
        {
            name: "Fast Food",
            _parent_category_id: "Restaurants"
        },
        {
            name: "Pizzerias",
            _parent_category_id: "Restaurants"
        },
        {
            name: "Restaurant Reviews & Reservations",
            _parent_category_id: "Restaurants"
        }
    ]

    // Seed categories with users and correct parent reference
    return seeding_utils.seedCategories(categories, writers)
}
