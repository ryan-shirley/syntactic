var faker = require("faker")

let users = []

for (let i = 0; i < 2; i++) {
    let first_name = faker.fake("{{name.firstName}}"),
        last_name = faker.fake("{{name.lastName}}"),
        email = `${first_name}.${last_name}@syntactic.com`

    let newUser = {
        first_name,
        last_name,
        uid: "SEED_USER_ONLY_" + email,
        email,
        role: [
            {
                name: "content seeker"
            }
        ],
        location: faker.fake("{{address.city}}, {{address.countryCode}}"),
        profile: {
            bio: faker.fake("{{lorem.sentences}}"),
            business: faker.fake("{{lorem.sentences}}")
        },
        profile_picture: faker.fake("{{internet.avatar}}"),
        completed_onboarding: true
    }

    users.push(newUser)
}

module.exports = users
