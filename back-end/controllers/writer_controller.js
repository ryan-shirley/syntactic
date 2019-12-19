const GOOGLE_NL_API = require("./google_nl_api.controller")
const CategoryController = require("./categories.controller")
const Category = require("../models/categories.model")
import admin from "../firebase-service"

/**
 * addContent() Take text and categorise. 
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

    const categories = await Category.find({ "users.uid": uid }).populate({
        path: "_parent_category_id",
        populate: {
            path: "_parent_category_id"
        }
    })

    // Format with parent at top level
    let formattedCategories = categories.map(category => {
        const { _id, name, users } = category
        
        // Check for parent
        if(category._parent_category_id) {
            // console.log('Has parent');
            const { _id: subId, name: subName, users: subUsers, _parent_category_id: subParent } = category._parent_category_id 

            if(subParent) {
                const { _id: sub2Id, name: sub2Name, users: sub2Users } = subParent

                return {
                    _id: sub2Id,
                    name: sub2Name,
                    users: sub2Users,
                    sub_category: {
                        _id: subId,
                        name: subName,
                        users: subUsers,
                        sub_category: {
                            _id,
                            name,
                            users
                        }
                    }
                }
            }
            else {
                return {
                    _id: subId,
                    name: subName,
                    users: subUsers,
                    sub_category: {
                        _id,
                        name,
                        users
                    }
                }
            }
        }

        return category
    })

    res.send({
        categories: formattedCategories
    })
}
