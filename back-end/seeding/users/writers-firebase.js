const seeding_utils = require("../utils")
var faker = require("faker")

const users = [
    {
        _id: seeding_utils.generateMongoObjectId(),
        first_name: 'Jonas',
        last_name: 'Harber',
        uid: "CgDu81fxdfQWpSQiQS9NAN5V9Vk2",
        email: 'jonas.harber@syntactic.com',
        role: [
            {
                name: "writer"
            }
        ],
        profile_picture: faker.fake("{{internet.avatar}}"),
        completed_onboarding: true
    },
    {
        _id: seeding_utils.generateMongoObjectId(),
        first_name: 'Emily',
        last_name: 'Wolff',
        uid: "qEgH5OGACva8XyUzFdineJksymx1",
        email: 'emily.wolff@syntactic.com',
        role: [
            {
                name: "writer"
            }
        ],
        profile_picture: faker.fake("{{internet.avatar}}"),
        completed_onboarding: true
    },
    {
        _id: seeding_utils.generateMongoObjectId(),
        first_name: 'Leann',
        last_name: 'Harvey',
        uid: "doxaxUprdEgwGykkSDLOljlQdAo2",
        email: 'leann.harvey@syntactic.com',
        role: [
            {
                name: "writer"
            }
        ],
        profile_picture: faker.fake("{{internet.avatar}}"),
        completed_onboarding: true
    },
]

module.exports = users
