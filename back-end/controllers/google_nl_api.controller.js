module.exports = {
    /**
     * classifyText() Derive the categories of content type from text
     */
    classifyText: async function classifyText(text) {
        // Imports the Google Cloud client library
        const language = require("@google-cloud/language")

        // Creates a client
        const client = new language.LanguageServiceClient()

        // Prepares a document, representing the provided text
        const document = {
            content: text,
            type: "PLAIN_TEXT"
        }

        // Classifies text in the document
        const [classification] = await client.classifyText({ document })
        classificationSeperated = seperateCategories(classification.categories)

        return classificationSeperated
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
