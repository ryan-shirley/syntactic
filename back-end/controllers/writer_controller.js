const User = require("../models/user.model")
const GOOGLE_NL_API = require("./google_nl_api.controller")
const CategoryController = require("./categories.controller")
const Category = require("../models/categories.model")

// Take text to categories and add to user
exports.addText = async (req, res) => {
    const { uid, text } = req.body

    let sepCats = await GOOGLE_NL_API.classifyText(text)
    // console.log(sepCats)

    // Loop through category array
    sepCats.map(async categoryObj => {
        let { categories, confidence } = categoryObj

        for (let i = 0; i < categories.length; i++) {
            let name = categories[i]

            let existStatus = await CategoryController.checkExists(name)

            // console.log(`Checking exist status of: ${name}. It is`, existStatus.exists);

            if (existStatus.exists) {
                // Category exists

                // Must be last in array to add
                if (i === categories.length - 1) {
                    // ADD User
                    await CategoryController.addUser(
                        name,
                        "5dd92e71e5cfa00b6e369d52",
                        confidence
                    )
                }
            } else {
                // Category DOESNT exist

                // If first in array & only one in array - create WITHOUT parent - WITH User
                if (i === 0 && categories.length === 1) {
                    // Create category WITHOUT parent
                    await CategoryController.createCategory(name, null, {
                        _user_id: "5dd92e71e5cfa00b6e369d52",
                        articles_written: 1,
                        confidence
                    })
                } else if (i === categories.length - 1) {
                    // Create category WITH parent - WITH User
                    await CategoryController.createCategory(name, categories[i - 1], {
                        _user_id: "5dd92e71e5cfa00b6e369d52",
                        articles_written: 1,
                        confidence
                    })
                } else {
                    // Create category WITH parent - WITHOUT user
                    await CategoryController.createCategory(
                        name,
                        categories[i - 1]
                    )
                }
            }
        }
    })

    res.send({
        body:
            "Woo 😀! Your text has been analysed and we have updated our database with these categories.",
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
