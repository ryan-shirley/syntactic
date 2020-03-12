var faker = require("faker")

module.exports = {
    generateMongoObjectId: function() {
        var timestamp = ((new Date().getTime() / 1000) | 0).toString(16)
        return (
            timestamp +
            "xxxxxxxxxxxxxxxx"
                .replace(/[x]/g, function() {
                    return ((Math.random() * 16) | 0).toString(16)
                })
                .toLowerCase()
        )
    },
    randomNumber: function(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    },
    seedCategories: function(categories, writers) {
        // Update _parent_category_id referance and add writers
        for (let i = 0; i < categories.length; i++) {
            let category = categories[i]

            // Setup category
            categories[i]._id = this.generateMongoObjectId()
            categories[i].users = []

            // Replace string with ObjectId
            if (category.hasOwnProperty("_parent_category_id")) {
                let parentName = category._parent_category_id

                for (let j = 0; j < categories.length; j++) {
                    let cat = categories[j]

                    if (parentName === cat.name) {
                        categories[i]._parent_category_id = cat._id
                    }
                }
            }

            // Add Writers to categories
            for (let k = 0; k < writers.length; k++) {
                // Random if they get added or not
                if (faker.random.boolean()) {
                    let user = writers[k],
                        articles_written = this.randomNumber(1, 12),
                        confidencePercent = this.randomNumber(90, 55)

                    categories[i].users.push({
                        user: user._id,
                        articles_written,
                        confidence: articles_written * (confidencePercent / 100)
                    })
                }
            }
        }

        return categories
    }
}
