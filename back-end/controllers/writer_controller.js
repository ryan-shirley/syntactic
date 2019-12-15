const GOOGLE_NL_API = require("./google_nl_api.controller")
const CategoryController = require("./categories.controller")
const Category = require("../models/categories.model")
import admin from "../firebase-service"

/**
 * addContent() Take text and categoriese. 
 * Save categories with user
 */
exports.addContent = async (req, res) => {
    try {
        const { text } = req.body
        const { authToken } = req
        
        // Get uid for user from firebase
        const userInfo = await admin.auth().verifyIdToken(authToken)
        const { uid } = userInfo
        
        // Categorise text
        let sepCats = await GOOGLE_NL_API.classifyText(text)

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
                            uid,
                            confidence
                        )
                    }
                } else {
                    // Category DOESNT exist

                    // If first in array & only one in array - create WITHOUT parent - WITH User
                    if (i === 0 && categories.length === 1) {
                        // Create category WITHOUT parent
                        await CategoryController.createCategory(name, null, {
                            uid,
                            articles_written: 1,
                            confidence
                        })
                    } else if (i === categories.length - 1) {
                        // Create category WITH parent - WITH User
                        await CategoryController.createCategory(
                            name,
                            categories[i - 1],
                            {
                                uid,
                                articles_written: 1,
                                confidence
                            }
                        )
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
    } catch (error) {
        // console.error(error)
        console.log(error)

        res.status(500).json(error)
    }
}

/**
 * getCategories() Get all the categories for an individual writer.
 */
exports.getCategories = async (req, res) => {
    const { id: uid } = req.params

    const categories = await Category.find({ 'users.uid': uid })

    res.send({
        categories
    })
}
