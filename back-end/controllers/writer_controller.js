const User = require("../models/user.model")
const GOOGLE_NL_API = require("./google_nl_api.controller")
const CategoryController = require("./categories.controller")
const Category = require("../models/categories.model")

// Take text to categories and add to user
exports.addText = async (req, res) => {
    const { uid, text } = req.body

    let sepCats = await GOOGLE_NL_API.classifyText(text)
    
    // Loop through category array
    sepCats.map(categoryObj => {
        let { categories, confidence } = categoryObj
        let lastCat = categories.length - 1

        // Loop though category individually
        categories.map((name, index) => {
            Category.findOne({ name })
                .then(cat => {
                    if (!cat) {
                        // Category doesn't exist in database

                        // Check is last item
                        if (lastCat === index) {
                            // Create Category with user
                            CategoryController.createCategory(name, {
                                _user_id: '5dd92e71e5cfa00b6e369d52',
                                articles_written: 1,
                                confidence
                            })
                        }
                        else {
                            // Create Category
                            CategoryController.createCategory(name)
                        }
                    }
                    else {
                        // Category exists

                        // Check is last item
                        if (lastCat === index) {
                            // console.log(`Last cat is: ${name}`)
                            // Add user to category
                            CategoryController.addUser(name, '5dd92e71e5cfa00b6e369d52', confidence)
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })

    res.send({
        body: 'Woo 😀! Your text has been analysed and we have updated our database with these categories.',
        categories: sepCats
    })
}

// Get categories from user
exports.getCategories = async (req, res) => {
    const id = req.params.id

    const categories = await Category.find()

    res.send({
        categories
    })
}