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

        let writers = []
        for (let i = 0; i < categoriesMatched.length; i++) {
            let { categories, confidence } = categoriesMatched[i]
            // Convert confidence to percentage
            confidence = confidence.toFixed(2) * 100

            let l3Exists = await CategoryController.checkExists(categories[2])
            if (l3Exists.exists) {
                const cat = await Category.findOne({
                    name: categories[2]
                }).populate("users.user", "first_name last_name")

                writers.push({
                    name: categories[2],
                    writers: cat.users,
                    confidence
                })
            }
            else {
                let l2Exists = await CategoryController.checkExists(categories[1])
                if (l2Exists.exists) {
                    const cat = await Category.findOne({
                        name: categories[1]
                    }).populate("users.user", "first_name last_name")
    
                    writers.push({
                        name: categories[1],
                        writers: cat.users,
                        confidence
                    })
                }
                else {
                    const cat = await Category.findOne({
                        name: categories[0]
                    }).populate("users.user", "first_name last_name")
    
                    writers.push({
                        name: categories[0],
                        writers: cat.users,
                        confidence
                    })
                }
            }
        }
        
        res.send({
            categoriesMatched
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
