// Models
const Category = require("../models/categories.model")

// Services
const CategoryService = require("./category.service")

/**
 * classifyText() Analyse text to find categories
 */
exports.classifyText = async text => {
    // Imports the Google Cloud client library
    const language = require("@google-cloud/language")

    // Creates a client
    const client = new language.LanguageServiceClient()

    // Prepares a document, representing the provided text
    let cleanedText = text.replace(/(\s\n)/gm, "").replace(/(\n)/gm, " ")
    const document = {
        content: cleanedText,
        type: "PLAIN_TEXT"
    }

    // Classifies text in the document
    const [classification] = await client.classifyText({
        document
    })
    categoriesMatched = seperateCategories(classification.categories)

    return categoriesMatched
}

/**
 * getWriters() Find writers who can write on matched categories
 */
exports.getWriters = async categoriesMatched => {
    let cat_level1, cat_level2, cat_level3
    let mainResults = []

    for (let j = 0; j < categoriesMatched.length; j++) {
        let results = {
            bestMatch: {},
            writersAdditionalRelevantCats: [],
            writersLowerCat: [],
            writersSameL2Cat: []
        }

        let category = categoriesMatched[j]

        switch (category.categories.length) {
            case 1:
                // Category Name
                cat_level1 = category.categories[0]

                // Writers in this best (level 1) category
                let level1_categories = await Category.findOne({
                    name: cat_level1
                }).populate({
                    path: "users.user"
                })

                if (level1_categories === null) {
                    results.bestMatch = {
                        category: cat_level1,
                        writers: []
                    }
                } else {
                    results.bestMatch = {
                        category: cat_level1,
                        writers: level1_categories.users
                    }

                    // Writers in sub categories to this (second level)
                    subCategories = await Category.find()
                        .where("_parent_category_id")
                        .equals(level1_categories._id)
                        .populate({
                            path: "users.user"
                        })

                    for (let i = 0; i < subCategories.length; i++) {
                        let category = subCategories[i]

                        results.writersLowerCat.push({
                            category: category.name,
                            writers: category.users
                        })

                        // Writers in sub categories to this (third level)
                        let subLevel2Categories = await Category.find()
                            .where("_parent_category_id")
                            .equals(category._id)
                            .populate({
                                path: "users.user"
                            })

                        subLevel2Categories.forEach(cat => {
                            results.writersLowerCat.push({
                                category: cat.name,
                                writers: cat.users
                            })
                        })
                    }
                }

                break
            case 2:
                // Category Name
                cat_level1 = category.categories[0]
                cat_level2 = category.categories[1]

                // Writers in best (level 2) category
                let level2_categories = await Category.findOne({
                    name: cat_level2
                }).populate({
                    path: "users.user"
                })

                if (level2_categories === null) {
                    results.bestMatch = {
                        category: cat_level2,
                        writers: []
                    }
                } else {
                    results.bestMatch = {
                        category: cat_level2,
                        writers: level2_categories.users
                    }

                    // Writers in sub categories to this (third level)
                    subCategories = await Category.find()
                        .where("_parent_category_id")
                        .equals(level2_categories._id)
                        .populate({
                            path: "users.user"
                        })

                    for (let i = 0; i < subCategories.length; i++) {
                        let category = subCategories[i]

                        results.writersLowerCat.push({
                            category: category.name,
                            writers: category.users
                        })
                    }

                    // Writers in parent categories to this (first level)
                    parentCategory = await Category.findOne()
                        .where("_id")
                        .equals(level2_categories._parent_category_id)
                        .populate({
                            path: "users.user"
                        })

                    results.writersAdditionalRelevantCats.push({
                        category: parentCategory.name,
                        writers: parentCategory.users
                    })

                    // Writers in sub categories to the parent (second level) excluding the one already got
                    subCategories = await Category.find({
                        _id: {
                            $ne: level2_categories._id
                        }
                    })
                        .where("_parent_category_id")
                        .equals(parentCategory._id)
                        .populate({
                            path: "users.user"
                        })

                    for (let i = 0; i < subCategories.length; i++) {
                        let category = subCategories[i]

                        results.writersAdditionalRelevantCats.push({
                            category: category.name,
                            writers: category.users
                        })

                        // Writers in sub categories to this (third level)
                        let subLevel2Categories = await Category.find()
                            .where("_parent_category_id")
                            .equals(category._id)
                            .populate({
                                path: "users.user"
                            })

                        subLevel2Categories.forEach(cat => {
                            results.writersAdditionalRelevantCats.push({
                                category: cat.name,
                                writers: cat.users
                            })
                        })
                    }
                }

                break
            case 3:
                // Category Name
                cat_level1 = category.categories[0]
                cat_level2 = category.categories[1]
                cat_level3 = category.categories[2]

                // Writers in best (level 3) category
                let level3_categories = await Category.findOne({
                    name: cat_level3
                }).populate({
                    path: "users.user"
                })

                if (level3_categories === null) {
                    results.bestMatch = {
                        category: cat_level3,
                        writers: []
                    }
                } else {
                    results.bestMatch = {
                        category: cat_level3,
                        writers: level3_categories.users
                    }

                    // Writers in parent category to this (second level)
                    parentCategory = await Category.findOne()
                        .where("_id")
                        .equals(level3_categories._parent_category_id)
                        .populate({
                            path: "users.user"
                        })
                    let secondLevelCatId = parentCategory._id

                    results.writersSameL2Cat.push({
                        category: parentCategory.name,
                        writers: parentCategory.users
                    })

                    // Writers in sub categories to the parent (third level) excluding the one already got
                    subCategories = await Category.find({
                        _id: {
                            $ne: level3_categories._id
                        }
                    })
                        .where("_parent_category_id")
                        .equals(parentCategory._id)
                        .populate({
                            path: "users.user"
                        })

                    for (let i = 0; i < subCategories.length; i++) {
                        let category = subCategories[i]

                        results.writersSameL2Cat.push({
                            category: category.name,
                            writers: category.users
                        })
                    }

                    // Writers in parent category (first level) to the second level category
                    parentCategory = await Category.findOne()
                        .where("_id")
                        .equals(parentCategory._parent_category_id)
                        .populate({
                            path: "users.user"
                        })

                    results.writersAdditionalRelevantCats.push({
                        category: parentCategory.name,
                        writers: parentCategory.users
                    })

                    // Writers in sub categories to the parent (second level) excluding the one already got
                    subCategories = await Category.find({
                        _id: {
                            $ne: secondLevelCatId
                        }
                    })
                        .where("_parent_category_id")
                        .equals(parentCategory._id)
                        .populate({
                            path: "users.user"
                        })

                    for (let i = 0; i < subCategories.length; i++) {
                        let category = subCategories[i]

                        results.writersAdditionalRelevantCats.push({
                            category: category.name,
                            writers: category.users
                        })

                        // Writers in sub categories to this (third level)
                        let subLevel2Categories = await Category.find()
                            .where("_parent_category_id")
                            .equals(category._id)
                            .populate({
                                path: "users.user"
                            })

                        subLevel2Categories.forEach(cat => {
                            results.writersAdditionalRelevantCats.push({
                                category: cat.name,
                                writers: cat.users
                            })
                        })
                    }
                }

                break
            default:
        }

        mainResults.push(results)
    }

    return {
        analysis: categoriesMatched,
        results: mainResults
    }
}

/**
 * addCategoriesToWriter() Add categories to writer
 */
exports.addCategoriesToWriter = async (cats, userID) => {
    // Loop through category array
    for(let i = 0; i < cats.length; i++) {
        let categoryObj = cats[i]
        
        let {
            categories,
            confidence
        } = categoryObj

        let cat_level1, cat_level2, cat_level3, level1_exists, level2_exists, level3_exists
        switch (categories.length) {
            case 1:
                cat_level1 = categories[0]

                level1_exists = await CategoryService.checkExists(cat_level1)
                if (level1_exists.exists) {
                    // Add user to present category
                    await CategoryService.addUser(cat_level1, userID, confidence)
                } else {
                    // Create Category with user
                    await CategoryService.createCategory(
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
                level1_exists = await CategoryService.checkExists(cat_level1)
                if (!level1_exists.exists) await CategoryService.createCategory(cat_level1)

                // Level 2
                level2_exists = await CategoryService.checkExists(cat_level2)
                if (level2_exists.exists) {
                    // Add user to present category
                    await CategoryService.addUser(cat_level2, userID, confidence)
                } else {
                    // Create Category with user
                    await CategoryService.createCategory(
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
                level1_exists = await CategoryService.checkExists(cat_level1)
                
                if (!level1_exists.exists) await CategoryService.createCategory(cat_level1)

                // Level 2
                level2_exists = await CategoryService.checkExists(cat_level2)
                if (!level2_exists.exists) await CategoryService.createCategory(cat_level2, cat_level1)

                // Level 3
                level3_exists = await CategoryService.checkExists(cat_level3)
                
                if (level3_exists.exists) {
                    // Add user to present category
                    await CategoryService.addUser(cat_level3, userID, confidence)
                } else {
                    // Create Category with user
                    await CategoryService.createCategory(
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
    }

    return
}
/**
 * seperateCategories() Takes category string and seperates it out
 */
seperateCategories = categories => {
    return categories.map(categoryObj => {
        let { name, confidence } = categoryObj

        // Sperate by slash
        categoryArray = name.split("/")
        categoryArray.shift()

        return {
            categories: categoryArray,
            confidence
        }
    })
}