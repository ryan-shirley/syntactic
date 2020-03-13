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
    generateLevels: async function(usersObj, categories) {
        let {
            nonFirebaseContentSeekers,
            firebaseContentSeekers,
            nonFirebaseWriters,
            firebaseWriters
        } = usersObj
        
        let writersWithLevels = await seeding_utils.seedLevels(firebaseWriters.concat(nonFirebaseWriters), categories)

        let users = writersWithLevels.concat(firebaseContentSeekers, nonFirebaseContentSeekers)
        
        return [
            {
                model: "User",
                documents: users
            }
        ]
    }
}
