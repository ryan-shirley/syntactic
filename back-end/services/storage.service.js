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
    } catch (error) {
        throw error
    }
}

/**
 * uploadFileToCloudStorage() Return file destination on cloud storage
 */
exports.uploadFileToCloudStorage = async (file, destination) => {

    // Imports the Google Cloud client library
    const { Storage } = require("@google-cloud/storage")

    // Creates a client - Use firebase account (seperate to NLP account)
    const projectId = "syntactic-iadt-year-4-fb"
    const keyFilename = "./firebase-storage-service.json"
    const storage = new Storage({ projectId, keyFilename })

    // Uploads a local file to the bucket
    let upload = await storage
        .bucket(process.env.FIREBASE_STORAGE_BUCKET)
        .upload(file, {
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            // By setting the option `destination`, you can change the name of the
            // object you are uploading to a bucket.
            metadata: {
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: "public, max-age=31536000"
            },
            public: true,
            destination
        })

    return upload[0].metadata.mediaLink
}

/**
 * deleteFolderFromCloudStorage() Delete folder on cloud storage
 */
exports.deleteFolderFromCloudStorage = async folder => {
    const { Storage } = require("@google-cloud/storage")

    // Creates a client - Use firebase account (seperate to NLP account)
    const projectId = "syntactic-iadt-year-4-fb"
    const keyFilename = "./firebase-storage-service.json"
    const storage = new Storage({ projectId, keyFilename })

    await storage
        .bucket(process.env.FIREBASE_STORAGE_BUCKET)
        .deleteFiles({ prefix: folder }, function(err) {
            if (err) throw err
        })

    return true
}
