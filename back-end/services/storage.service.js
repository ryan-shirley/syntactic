const fs = require("fs")
const pdf = require("pdf-parse")

/**
 * getTextFromFile() Return text contained in a file
 */
exports.getTextFromFile = async file => {
    try {
        // Get text from pdf
        // Get PDF
        let doc = fs.readFileSync(file)

        // Retrieve text from the PDF
        const { text } = await pdf(doc)

        // Clean text to remove characters
        let cleanedText = text.replace(/(\s\n)/gm, "").replace(/(\n)/gm, " ")

        // Return text from file
        return cleanedText
    }
    catch (error) {
        throw error
    }
}
