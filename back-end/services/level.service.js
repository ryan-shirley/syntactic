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

    return {
        confidence,
        numArticles
    }
}

/**
 * calcLevel() Return level a user is
 */
export function calcLevel(confidence, numArticles) {
    confidence = confidence / numArticles

    for (let level = 1; level < 10; level++) {
        let details = requiredForLevel(level)

        if (
            details.confidence < confidence &&
            details.numArticles < numArticles
        ) {
            continue
        } else {
            return level
        }
    }

    return level
}
