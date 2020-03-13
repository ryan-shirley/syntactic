var faker = require("faker")
var moment = require("moment")

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
    },
    seedProject: function(titleObj, writers, contentSeekers, status) {
        let _id = this.generateMongoObjectId(),
            title = titleObj.name,
            end_date = faker.date.past(1), // Past year
            content = `# **${title}** \nWe are releasing our brand **NEW** collection in the summer of 2020`,
            writer = writers[Math.floor(Math.random() * writers.length)],
            content_seeker =
                contentSeekers[
                    Math.floor(Math.random() * contentSeekers.length)
                ]

        // Inital project details
        let project = {
            _id,
            title,
            status,
            end_date,
            content_seeker_id: content_seeker._id,
            amount: Math.ceil((Math.random() * (750 - 150) + 150) / 10) * 10,
            createdAt: moment(end_date).subtract(2, "months")
        }

        // Add information based on project status
        if (["invitation pending", "writing", "completed"].includes(status)) {
            project.writer_id = writer._id
        }
        if (["writing", "completed"].includes(status)) {
            project.content = content
            project.deliverables = [
                {
                    status: "rejected",
                    title: "First draft",
                    content_seeker_notes:
                        "Good start however, I would I feel like you need to highlight the facts a little more as I do not think they are clear.",
                    content,
                    createdAt: moment(end_date).subtract(1, "months")
                },
                {
                    status: "accepted",
                    title: "Second draft",
                    content_seeker_notes: "Well done!! I love this. Good job.",
                    content,
                    createdAt: moment(end_date).subtract(4, "days")
                }
            ]
        }
        if (!["draft"].includes(status)) {
            project.brief = {
                path: `seeded-projects/${_id}/Brief.pdf`,
                analysis: titleObj.analysis
            }
        }

        return project
    },
    randomProjectStatus: function() {
        let possibleStats = [
            "draft",
            "invitation pending",
            "invitation rejected",
            "writing",
            "completed"
        ]

        return possibleStats[Math.floor(Math.random() * possibleStats.length)]
    }
}
