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

    // Create Main results object to be returned
    let results = {
        recommended: {
            categories: [],
            writers: []
        },
        relevant: {
            categories: [],
            writers: []
        },
        others: {
            categories: [],
            writers: []
        }
    }

    for (let j = 0; j < categoriesMatched.length; j++) {
        let category = categoriesMatched[j]

        switch (category.categories.length) {
            case 1:
                // Category Name
                cat_level1 = category.categories[0]

                // Writers in this best (level 1) category
                let level1_categories = await Category.findOne({
                    name: cat_level1
                }).populate({
                    path: "users.user",
                    select: "first_name last_name levels profile profile_picture location"
                })

                if (level1_categories === null) {
                    results.recommended.categories.push(cat_level1)
                } else {
                    results.recommended.categories.push(cat_level1)

                    if (level1_categories.users) {
                        results.recommended.writers = results.recommended.writers.concat(
                            level1_categories.users
                        )
                    }

                    // Writers in sub categories to this (second level)
                    subCategories = await Category.find()
                        .where("_parent_category_id")
                        .equals(level1_categories._id)
                        .populate({
                            path: "users.user",
                            select: "first_name last_name levels profile profile_picture location"
                        })

                    for (let i = 0; i < subCategories.length; i++) {
                        let category = subCategories[i]

                        results.recommended.categories.push(category.name)

                        if (category.users) {
                            results.recommended.writers = results.recommended.writers.concat(
                                category.users
                            )
                        }

                        // Writers in sub categories to this (third level)
                        let subLevel2Categories = await Category.find()
                            .where("_parent_category_id")
                            .equals(category._id)
                            .populate({
                                path: "users.user",
                                select: "first_name last_name levels profile profile_picture location"
                            })

                        subLevel2Categories.forEach(cat => {
                            results.recommended.categories.push(cat.name)

                            if (cat.users) {
                                results.recommended.writers = results.recommended.writers.concat()
                            }
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
                    path: "users.user",
                    select: "first_name last_name levels profile profile_picture location"
                })

                if (level2_categories === null) {
                    results.recommended.categories.push(cat_level2)
                } else {
                    results.recommended.categories.push(cat_level2)

                    if (level2_categories.users) {
                        results.recommended.writers = results.recommended.writers.concat(
                            level2_categories.users
                        )
                    }

                    // Writers in sub categories to this (third level)
                    subCategories = await Category.find()
                        .where("_parent_category_id")
                        .equals(level2_categories._id)
                        .populate({
                            path: "users.user",
                            select: "first_name last_name levels profile profile_picture location"
                        })

                    for (let i = 0; i < subCategories.length; i++) {
                        let category = subCategories[i]

                        results.recommended.categories.push(category.name)

                        if (category.users) {
                            results.recommended.writers = results.recommended.writers.concat(
                                category.users
                            )
                        }
                    }

                    // Writers in parent categories to this (first level)
                    parentCategory = await Category.findOne()
                        .where("_id")
                        .equals(level2_categories._parent_category_id)
                        .populate({
                            path: "users.user",
                            select: "first_name last_name levels profile profile_picture location"
                        })

                    results.others.categories.push(parentCategory.name)

                    if (parentCategory.users) {
                        results.others.writers = results.others.writers.concat(
                            parentCategory.users
                        )
                    }

                    // Writers in sub categories to the parent (second level) excluding the one already got
                    subCategories = await Category.find({
                        _id: {
                            $ne: level2_categories._id
                        }
                    })
                        .where("_parent_category_id")
                        .equals(parentCategory._id)
                        .populate({
                            path: "users.user",
                            select: "first_name last_name levels profile profile_picture location"
                        })

                    for (let i = 0; i < subCategories.length; i++) {
                        let category = subCategories[i]

                        results.others.categories.push(category.name)

                        if (category.users) {
                            results.others.writers = results.others.writers.concat(
                                category.users
                            )
                        }

                        // Writers in sub categories to this (third level)
                        let subLevel2Categories = await Category.find()
                            .where("_parent_category_id")
                            .equals(category._id)
                            .populate({
                                path: "users.user",
                                select: "first_name last_name levels profile profile_picture location"
                            })

                        subLevel2Categories.forEach(cat => {
                            results.others.categories.push(cat.name)

                            if (cat.users) {
                                results.others.writers = results.others.writers.concat(
                                    cat.users
                                )
                            }
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
                    path: "users.user",
                    select: "first_name last_name levels profile profile_picture location"
                })

                if (level3_categories === null) {
                    results.recommended.categories.push(cat_level3)
                } else {
                    results.recommended.categories.push(cat_level3)

                    if (level3_categories.users) {
                        results.recommended.writers = results.recommended.writers.concat(
                            level3_categories.users
                        )
                    }

                    // Writers in parent category to this (second level)
                    parentCategory = await Category.findOne()
                        .where("_id")
                        .equals(level3_categories._parent_category_id)
                        .populate({
                            path: "users.user",
                            select: "first_name last_name levels profile profile_picture location"
                        })
                    let secondLevelCatId = parentCategory._id

                    results.relevant.categories.push(parentCategory.name)

                    if (parentCategory.users) {
                        results.relevant.writers = results.relevant.writers.concat(
                            parentCategory.users
                        )
                    }

                    // Writers in sub categories to the parent (third level) excluding the one already got
                    subCategories = await Category.find({
                        _id: {
                            $ne: level3_categories._id
                        }
                    })
                        .where("_parent_category_id")
                        .equals(parentCategory._id)
                        .populate({
                            path: "users.user",
                            select: "first_name last_name levels profile profile_picture location"
                        })

                    for (let i = 0; i < subCategories.length; i++) {
                        let category = subCategories[i]

                        results.relevant.categories.push(category.name)

                        if (category.users) {
                            results.relevant.writers = results.relevant.writers.concat(
                                category.users
                            )
                        }
                    }

                    // Writers in parent category (first level) to the second level category
                    parentCategory = await Category.findOne()
                        .where("_id")
                        .equals(parentCategory._parent_category_id)
                        .populate({
                            path: "users.user",
                            select: "first_name last_name levels profile profile_picture location"
                        })

                    results.others.categories.push(parentCategory.name)

                    if (parentCategory.users) {
                        results.others.writers = results.others.writers.concat(
                            parentCategory.users
                        )
                    }

                    // Writers in sub categories to the parent (second level) excluding the one already got
                    subCategories = await Category.find({
                        _id: {
                            $ne: secondLevelCatId
                        }
                    })
                        .where("_parent_category_id")
                        .equals(parentCategory._id)
                        .populate({
                            path: "users.user",
                            select: "first_name last_name levels profile profile_picture location"
                        })

                    for (let i = 0; i < subCategories.length; i++) {
                        let category = subCategories[i]

                        results.others.categories.push(category.name)

                        if (category.users) {
                            results.others.writers = results.others.writers.concat(
                                category.users
                            )
                        }

                        // Writers in sub categories to this (third level)
                        let subLevel2Categories = await Category.find()
                            .where("_parent_category_id")
                            .equals(category._id)
                            .populate({
                                path: "users.user",
                                select: "first_name last_name levels profile profile_picture location"
                            })

                        subLevel2Categories.forEach(cat => {
                            results.others.categories.push(cat.name)

                            if (cat.users) {
                                results.others.writers = results.others.writers.concat(
                                    cat.users
                                )
                            }
                        })
                    }
                }

                break
            default:
        }
    }

    // Remove Duplicates in each list
    results.recommended.writers = removeDuplicates(results.recommended.writers)
    results.relevant.writers = removeDuplicates(results.relevant.writers)
    results.others.writers = removeDuplicates(results.others.writers)

    // Filter writer lists so writer only in once and in most relevant list
    results.relevant.writers = results.relevant.writers.filter(
        (value, index, arr) => {
            for (let i = 0; i < results.recommended.writers.length; i++) {
                let writer = results.recommended.writers[i]

                if (writer.user._id.toString() === value.user._id.toString()) {
                    return false
                }
            }

            return true
        }
    )

    // Array of recommended and relevant writers
    let usersRecRel = results.relevant.writers.concat(
        results.recommended.writers
    )

    results.others.writers = results.relevant.writers.filter(
        (value, index, arr) => {
            for (let i = 0; i < usersRecRel.length; i++) {
                let writer = usersRecRel[i]

                if (writer.user._id.toString() === value.user._id.toString()) {
                    return false
                }
            }

            return true
        }
    )

    return results
}

/**
 * addCategoriesToWriter() Add categories to writer
 */
exports.addCategoriesToWriter = async (cats, userID) => {
    // Loop through category array
    for (let i = 0; i < cats.length; i++) {
        let categoryObj = cats[i]

        let { categories, confidence } = categoryObj

        let cat_level1,
            cat_level2,
            cat_level3,
            level1_exists,
            level2_exists,
            level3_exists
        switch (categories.length) {
            case 1:
                cat_level1 = categories[0]

                level1_exists = await CategoryService.checkExists(cat_level1)
                if (level1_exists.exists) {
                    // Add user to present category
                    await CategoryService.addUser(
                        cat_level1,
                        userID,
                        confidence
                    )
                } else {
                    // Create Category with user
                    await CategoryService.createCategory(cat_level1, null, {
                        user: userID,
                        articles_written: 1,
                        confidence
                    })
                }
                break
            case 2:
                cat_level1 = categories[0]
                cat_level2 = categories[1]

                // Level 1
                level1_exists = await CategoryService.checkExists(cat_level1)
                if (!level1_exists.exists)
                    await CategoryService.createCategory(cat_level1)

                // Level 2
                level2_exists = await CategoryService.checkExists(cat_level2)
                if (level2_exists.exists) {
                    // Add user to present category
                    await CategoryService.addUser(
                        cat_level2,
                        userID,
                        confidence
                    )
                } else {
                    // Create Category with user
                    await CategoryService.createCategory(
                        cat_level2,
                        cat_level1,
                        {
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

                if (!level1_exists.exists)
                    await CategoryService.createCategory(cat_level1)

                // Level 2
                level2_exists = await CategoryService.checkExists(cat_level2)
                if (!level2_exists.exists)
                    await CategoryService.createCategory(cat_level2, cat_level1)

                // Level 3
                level3_exists = await CategoryService.checkExists(cat_level3)

                if (level3_exists.exists) {
                    // Add user to present category
                    await CategoryService.addUser(
                        cat_level3,
                        userID,
                        confidence
                    )
                } else {
                    // Create Category with user
                    await CategoryService.createCategory(
                        cat_level3,
                        cat_level2,
                        {
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
const seperateCategories = categories => {
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

/**
 * removeDuplicates() Removes duplicate writers from an array
 */
const removeDuplicates = ary => {
    return ary.reduce((acc, current) => {
        const x = acc.find(
            item => item.user._id.toString() === current.user._id.toString()
        )
        if (!x) {
            return acc.concat([current])
        } else {
            return acc
        }
    }, [])
}
