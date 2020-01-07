const CategoryController = require("./categories.controller")
const Category = require("../models/categories.model")

/**
 * classifyText() Derive the categories of content type from text
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
    const [classification] = await client.classifyText({ document })
    classificationSeperated = seperateCategories(classification.categories)

    return classificationSeperated
}

/**
 * analyse() Analyse breif and get writers
 */
exports.analyse = async (req, res) => {
    const { text } = req.body

    // Categorise text
    try {
        // Imports the Google Cloud client library
        const language = require("@google-cloud/language")

        // Creates a client
        const client = new language.LanguageServiceClient()

        let cleanedText = text.replace(/(\s\n)/gm, "").replace(/(\n)/gm, " ")

        // Prepares a document, representing the provided text
        const document = {
            content: cleanedText,
            type: "PLAIN_TEXT"
        }

        // Classifies text in the document
        const [classification] = await client.classifyText({ document })
        categoriesMatched = seperateCategories(classification.categories)

        let cat_level1, cat_level2, cat_level3, level1_writers, level2_writers, level3_writers, subCategoryWriters, otherCategoryWriters, sameL3CategoryWriters, subCategories, parentCategory
        let mainResults = []

        for(let j = 0; j < categoriesMatched.length; j++) {
            let results = {
                bestMatch: [],
                writersAdditionalRelevantCats: [],
                writersLowerCat: [],
                writersSameL2Cat: []
            }

            let category = categoriesMatched[j]
            

            switch(category.categories.length) {
                case 1:
                    // Category Name
                    cat_level1 = category.categories[0]

                    // Writers in this best (level 1) category
                    let level1_categories = await Category.findOne({ name: cat_level1 })

                    if(level1_categories === null) {
                        level1_writers = {
                            category: cat_level1,
                            writers: []
                        }
                    }
                    else {
                        level1_writers = {
                            category: cat_level1,
                            writers: level1_categories.users
                        }
    
                        // Writers in sub categories to this (second level)
                        subCategories = await Category.find().where('_parent_category_id').equals(level1_categories._id).populate({
                            path: "users.user"
                        })
    
                        subCategoryWriters = []
                        for(let i = 0; i < subCategories.length; i++) {
                            let category = subCategories[i]
    
                            subCategoryWriters.push({
                                category: category.name,
                                writers: category.users
                            })
    
                            // Writers in sub categories to this (third level)
                            let subLevel2Categories = await Category.find().where('_parent_category_id').equals(category._id).populate({
                                path: "users.user"
                            })
    
                            subLevel2Categories.forEach(cat => {
                                subCategoryWriters.push({
                                    category: cat.name,
                                    writers: cat.users
                                })
                            })
                        }
                    }
                    
                    // Assign results to be sent back
                    console.log(level1_writers);
                    
                    results.bestMatch = level1_writers
                    results.writersLowerCat = subCategoryWriters

                    break
                case 2:
                    // Category Name
                    cat_level1 = category.categories[0]
                    cat_level2 = category.categories[1]

                    // Writers in best (level 2) category
                    let level2_categories = await Category.findOne({ name: cat_level2 })

                    if(level2_categories === null) {
                        level2_writers = {
                            category: cat_level2,
                            writers: []
                        }
                    }
                    else {
                        level2_writers = {
                            category: cat_level2,
                            writers: level2_categories.users
                        }

                        // Writers in sub categories to this (third level)
                        subCategories = await Category.find().where('_parent_category_id').equals(level2_categories._id).populate({
                            path: "users.user"
                        })

                        subCategoryWriters = []
                        for(let i = 0; i < subCategories.length; i++) {
                            let category = subCategories[i]

                            subCategoryWriters.push({
                                category: category.name,
                                writers: category.users
                            })
                        }

                        // Writers in parent categories to this (first level)
                        parentCategory = await Category.findOne().where('_id').equals(level2_categories._parent_category_id).populate({
                            path: "users.user"
                        })

                        otherCategoryWriters = [
                            {
                                category: parentCategory.name,
                                writers: parentCategory.users
                            }
                        ]

                        // Writers in sub categories to the parent (second level) excluding the one already got
                        subCategories = await Category.find({ _id: {$ne: level2_categories._id} }).where('_parent_category_id').equals(parentCategory._id).populate({
                            path: "users.user"
                        })

                        for(let i = 0; i < subCategories.length; i++) {
                            let category = subCategories[i]

                            otherCategoryWriters.push({
                                category: category.name,
                                writers: category.users
                            })

                            // Writers in sub categories to this (third level)
                            let subLevel2Categories = await Category.find().where('_parent_category_id').equals(category._id).populate({
                                path: "users.user"
                            })

                            subLevel2Categories.forEach(cat => {
                                otherCategoryWriters.push({
                                    category: cat.name,
                                    writers: cat.users
                                })
                            })
                        }
                    }

                    // Assign results to be sent back
                    results.bestMatch = level2_writers
                    results.writersLowerCat = subCategoryWriters
                    results.writersAdditionalRelevantCats = otherCategoryWriters

                    break
                case 3:
                    // Category Name
                    cat_level1 = category.categories[0]
                    cat_level2 = category.categories[1]
                    cat_level3 = category.categories[2]

                    // Writers in best (level 3) category
                    let level3_categories = await Category.findOne({ name: cat_level3 })

                    if(level3_categories === null) {
                        level3_writers = {
                            category: cat_level3,
                            writers: []
                        }
                    }
                    else {
                        level3_writers = {
                            category: cat_level3,
                            writers: level3_categories.users
                        }

                        // Writers in parent category to this (second level)
                        parentCategory = await Category.findOne().where('_id').equals(level3_categories._parent_category_id).populate({
                            path: "users.user"
                        })
                        let secondLevelCatId = parentCategory._id

                        sameL3CategoryWriters = [
                            {
                                category: parentCategory.name,
                                writers: parentCategory.users
                            }
                        ]

                        // Writers in sub categories to the parent (third level) excluding the one already got
                        subCategories = await Category.find({ _id: {$ne: level3_categories._id} }).where('_parent_category_id').equals(parentCategory._id).populate({
                            path: "users.user"
                        })
                        
                        for(let i = 0; i < subCategories.length; i++) {
                            let category = subCategories[i]

                            sameL3CategoryWriters.push({
                                category: category.name,
                                writers: category.users
                            })
                        }

                        // Writers in parent category (first level) to the second level category
                        parentCategory = await Category.findOne().where('_id').equals(parentCategory._parent_category_id).populate({
                            path: "users.user"
                        })

                        otherCategoryWriters = [
                            {
                                category: parentCategory.name,
                                writers: parentCategory.users
                            }
                        ]

                        // Writers in sub categories to the parent (second level) excluding the one already got
                        subCategories = await Category.find({ _id: {$ne: secondLevelCatId} }).where('_parent_category_id').equals(parentCategory._id).populate({
                            path: "users.user"
                        })

                        for(let i = 0; i < subCategories.length; i++) {
                            let category = subCategories[i]

                            otherCategoryWriters.push({
                                category: category.name,
                                writers: category.users
                            })

                            // Writers in sub categories to this (third level)
                            let subLevel2Categories = await Category.find().where('_parent_category_id').equals(category._id).populate({
                                path: "users.user"
                            })

                            subLevel2Categories.forEach(cat => {
                                otherCategoryWriters.push({
                                    category: cat.name,
                                    writers: cat.users
                                })
                            })
                        }
                    }

                    // Assign results to be sent back
                    results.bestMatch = level3_writers
                    results.writersSameL2Cat = sameL3CategoryWriters
                    results.writersAdditionalRelevantCats = otherCategoryWriters

                    break
                default:
            }

            mainResults.push(results)
        }
        
        res.send({
            analysis: categoriesMatched,
            results: mainResults
        })
    } catch (error) {
        console.error(error)

        res.status(500).json(error)
    }
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
