const GOOGLE_NL_API = require("../google_nl_api.controller")
const CategoryController = require("./../categories.controller")
const Category = require("../../models/categories.model")
const User = require("../../models/user.model")
import admin from "../../firebase-service"

/**
 * addContent() Take text and categorise.
 * Save categories with user
 */
exports.addContent = async (req, res) => {
    try {
        const {
            text
        } = req.body
        const {
            authToken
        } = req

        // Get uid for user from firebase
        const userInfo = await admin.auth().verifyIdToken(authToken)
        const {
            uid
        } = userInfo

        // Get user id from mongo
        let userIDObj = await User.findOne({
            uid
        }).select({
            _id: 1
        })
        let userID = userIDObj._id

        // Categorise text
        let sepCats = await GOOGLE_NL_API.classifyText(text)

        // Loop through category array
        sepCats.map(async categoryObj => {
            let {
                categories,
                confidence
            } = categoryObj

            // TODO: Change UID to object ID
            let cat_level1, cat_level2, cat_level3, level1_exists, level2_exists, level3_exists
            switch (categories.length) {
                case 1:
                    cat_level1 = categories[0]

                    level1_exists = await CategoryController.checkExists(cat_level1)
                    if (level1_exists.exists) {
                        // Add user to present category
                        await CategoryController.addUser(cat_level1, userID, confidence)
                    } else {
                        // Create Category with user
                        await CategoryController.createCategory(
                            cat_level1,
                            null, {
                                user: userID,
                                articles_written: 1,
                                confidence
                            }
                        )
                    }
                    break
                case 2:
                    cat_level1 = categories[0]
                    cat_level2 = categories[1]

                    // Level 1
                    level1_exists = await CategoryController.checkExists(cat_level1)
                    if (!level1_exists.exists) await CategoryController.createCategory(cat_level1)

                    // Level 2
                    level2_exists = await CategoryController.checkExists(cat_level2)
                    if (level2_exists.exists) {
                        // Add user to present category
                        await CategoryController.addUser(cat_level2, userID, confidence)
                    } else {
                        // Create Category with user
                        await CategoryController.createCategory(
                            cat_level2,
                            cat_level1, {
                                user: userID,
                                articles_written: 1,
                                confidence
                            }
                        )
                    }
                    break
                case 3:
                    cat_level1 = categories[0]
                    cat_level2 = categories[1]
                    cat_level3 = categories[2]

                    // Level 1
                    level1_exists = await CategoryController.checkExists(cat_level1)
                    if (!level1_exists.exists) await CategoryController.createCategory(cat_level1)

                    // Level 2
                    level2_exists = await CategoryController.checkExists(cat_level2)
                    if (!level2_exists.exists) await CategoryController.createCategory(cat_level2, cat_level1)

                    // Level 3
                    level3_exists = await CategoryController.checkExists(cat_level3)
                    if (level3_exists.exists) {
                        // Add user to present category
                        await CategoryController.addUser(cat_level3, userID, confidence)
                    } else {
                        // Create Category with user
                        await CategoryController.createCategory(
                            cat_level3,
                            cat_level2, {
                                user: userID,
                                articles_written: 1,
                                confidence
                            }
                        )
                    }
                    break
                default:
            }
        })

        res.send({
            body: "Woo 😀! Your text has been analysed and we have updated our database with these categories.",
            categories: sepCats
        })
    } catch (error) {
        // console.error(error)
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
        let userStats = users.find(user => user.uid === uid)

        // Get stats for user
        let stats
        if (userStats) {
            stats = {
                confidence:
                    (userStats.confidence / userStats.articles_written).toFixed(
                        2
                    ) * 100,
                articles_written: userStats.articles_written
            }
        }

        // Check for parent
        if (category._parent_category_id) {
            // console.log('Has parent');
            const {
                _id: subId,
                name: subName,
                users: subUsers,
                _parent_category_id: subParent
            } = category._parent_category_id
            let subUserStats = subUsers.find(user => user.uid === uid)

            // Get stats for user
            let subStats
            if (subUserStats) {
                subStats = {
                    confidence:
                        (
                            subUserStats.confidence /
                            subUserStats.articles_written
                        ).toFixed(2) * 100,
                    articles_written: subUserStats.articles_written
                }
            }

            if (subParent) {
                const {
                    _id: sub2Id,
                    name: sub2Name,
                    users: sub2Users
                } = subParent
                let sub2UserStats = sub2Users.find(user => user.uid === uid)

                // Get stats for user
                let sub2Stats
                if (sub2UserStats) {
                    sub2Stats = {
                        confidence:
                            (
                                sub2UserStats.confidence /
                                sub2UserStats.articles_written
                            ).toFixed(2) * 100,
                        articles_written: sub2UserStats.articles_written
                    }
                }

                return {
                    _id: sub2Id,
                    name: sub2Name,
                    stats: sub2Stats,
                    sub_category: {
                        _id: subId,
                        name: subName,
                        stats: subStats,
                        sub_category: {
                            _id,
                            name,
                            stats
                        }
                    }
                }
            } else {
                return {
                    _id: subId,
                    name: subName,
                    stats: subStats,
                    sub_category: {
                        _id,
                        name,
                        stats
                    }
                }
            }
        }

        return { _id, name, stats }
    })

    res.send({
        categories: formattedCategories
    })
}
