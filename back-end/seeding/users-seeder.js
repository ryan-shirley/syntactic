// Collection Seeder Functions
const seeding_utils = require("./utils")

// Import Collections
let nonFirebaseContentSeekers = require("./users/content-seekers-non-firebase")
let firebaseContentSeekers = require("./users/content-seekers-firebase")
let nonFirebaseWriters = require("./users/writers-non-firebase")
let firebaseWriters = require("./users/writers-firebase")

module.exports = module.exports = {
    createUsers: function() {
        return {
            nonFirebaseContentSeekers,
            firebaseContentSeekers,
            nonFirebaseWriters,
            firebaseWriters
        }
    },
    generateLevels: function(usersObj) {
        let {
            nonFirebaseContentSeekers,
            firebaseContentSeekers,
            nonFirebaseWriters,
            firebaseWriters
        } = usersObj

        // let writersWithLevels = seeding_utils.seedLevels(firebaseWriters.concat(nonFirebaseWriters), categories)

        let users = nonFirebaseContentSeekers.concat(firebaseContentSeekers, nonFirebaseWriters, firebaseWriters)

        return [
            {
                model: "User",
                documents: users
            }
        ]
    }
}
