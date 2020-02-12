const GOOGLE_NL_API = require("../google_nl_api.controller")
const CategoryController = require("./../categories.controller")
const Category = require("../../models/categories.model")
const User = require("../../models/user.model")
import admin from "../../config/firebase-service"


/**
 * getCategories() Get all the categories for an individual writer.
 */
exports.getCategories = async (req, res) => {
    const { id: uid } = req.params

    let userIDObj = await User.findOne({
        uid
    }).select({
        _id: 1
    })
    let userID = escape(userIDObj._id)

    const categories = await Category.find({ "users.user": userID }).populate({
        path: "_parent_category_id",
        populate: {
            path: "_parent_category_id"
        }
    })

    // Format with parent at top level
    let formattedCategories = categories.map(category => {
        const { _id, name, users } = category
        let userStats = users.find(user => escape(user.user) === userID)
        

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
            let subUserStats = subUsers.find(user => escape(user.user) === userID)

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
                let sub2UserStats = sub2Users.find(user => escape(user.user) === userID)

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
