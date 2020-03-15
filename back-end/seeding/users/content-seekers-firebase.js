const seeding_utils = require("../utils")
var faker = require("faker")

const users = [
    {
        _id: seeding_utils.generateMongoObjectId(),
        first_name: "Niko",
        last_name: "King",
        uid: "JUz0jkoVEITo1tG1FNsh7XsGaaI2",
        email: "princeofcod123@gmail.com",
        role: [
            {
                name: "content seeker"
            }
        ],
        profile: {
            bio: faker.fake("{{lorem.sentences}}"),
            business: faker.fake("{{lorem.sentences}}")
        },
        profile_picture: faker.fake("{{internet.avatar}}"),
        completed_onboarding: true
    },
    {
        _id: seeding_utils.generateMongoObjectId(),
        first_name: "Rey",
        last_name: "Kreiger",
        uid: "iDtDuZ0gC9c06sMJmovO8XANql33",
        email: "rey.kreiger@syntactic.com",
        role: [
            {
                name: "content seeker"
            }
        ],
        profile: {
            bio: faker.fake("{{lorem.sentences}}"),
            business: faker.fake("{{lorem.sentences}}")
        },
        profile_picture: faker.fake("{{internet.avatar}}"),
        completed_onboarding: true
    },
    {
        _id: seeding_utils.generateMongoObjectId(),
        first_name: "Rosa",
        last_name: "Adams",
        uid: "JjIMe55Gyoh4rpT3UidRaW457bm1",
        email: "rosa.adams@syntactic.com",
        role: [
            {
                name: "content seeker"
            }
        ],
        profile: {
            bio: faker.fake("{{lorem.sentences}}"),
            business: faker.fake("{{lorem.sentences}}")
        },
        profile_picture: faker.fake("{{internet.avatar}}"),
        completed_onboarding: true
    }
]

module.exports = users
