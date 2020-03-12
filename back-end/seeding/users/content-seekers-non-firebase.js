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
        profile_picture: faker.fake("{{internet.avatar}}")
    }

    users.push(newUser)
}

module.exports = users
