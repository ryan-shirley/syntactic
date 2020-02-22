const CategoryService = require("./category.service")

const confidenceExponent = 1.075
const baseConfidence = 50
const maxConfidence = 0.8

const articlesExponent = 1.8
const baseArticles = 1

/**
 * requiredForLevel() Return required confidence and articles for a level
 */
requiredForLevel = level => {
    // Confidence required
    let confidence =
        Math.floor(baseConfidence * Math.pow(confidenceExponent, level)) / 100

    // Set max confidence
    if (confidence > maxConfidence) {
        confidence = maxConfidence
    }

    // Articles required
    let numArticles = Math.floor(
        baseArticles * Math.pow(articlesExponent, level)
    )

    // Set min confidence for level 1 as 0
    if(level === 1) {
        confidence = 0
    }

    return {
        confidence,
        numArticles
    }
}

/**
 * calcLevel() Return level a user is
 */
calcLevel = (confidence, numArticles) => {
    confidence = confidence / numArticles

    var lev = 0

    for (let level = 1; level < 10; level++) {
        let details = requiredForLevel(level)

        if (
            details.confidence <= confidence &&
            details.numArticles <= numArticles
        ) {
            lev = level
        }
    }

    // Ensure at least level 1
    if(lev === 0 && numArticles >= 1) {
        lev = 1
    }

    return lev
}

exports.generateLevel = async (categoryName, userId) => {
    let category = await CategoryService.findOneByName(categoryName)
    let users = category.users

    let userResults
    if (!users) {
        userResults = {
            confidence: 0,
            articles_written: 0
        }
    } else {
        // User results from main category
        userResults = users.find(
            user => user.user.toString() === userId.toString()
        )

        if (!userResults) {
            userResults = {
                confidence: 0,
                articles_written: 0
            }
        }
    }

    // Get all categories where this is parent and add to results
    let subCategories = await CategoryService.getSubCategories(category._id)

    // Check Sub Categories for the sub categories
    for (var i = 0; i < subCategories.length; i++) {
        let cat = subCategories[i]

        if(cat.users) {
            let results = cat.users.find(
                user => user.user.toString() === userId.toString()
            )

            if (results) {
                userResults.confidence += results.confidence
                userResults.articles_written += results.articles_written
            }
        }
    }

    // Calculate Level
    let newLevel = calcLevel(
        userResults.confidence,
        userResults.articles_written
    )

    return newLevel
}
