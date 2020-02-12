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
    const [classification] = await client.classifyText({
        document
    })
    classificationSeperated = seperateCategories(classification.categories)

    return classificationSeperated
}