let science_seeder = require("./science")
let computersElectronics_seeder = require("./computersElectronics")
let foodDrink_seeder = require("./foodDrink")
// let sports_seeder = require("./sports")

module.exports = function seedProjects(firebaseContentSeekers, firebaseWriters, nonFirebaseWriters) {
    // Get firebase users individually
    let cs1 = firebaseContentSeekers[0],
        cs2 = firebaseContentSeekers[1],
        cs3 = firebaseContentSeekers[2],
        w1 = firebaseWriters[0],
        w2 = firebaseWriters[1],
        w3 = firebaseWriters[2]

    // Seed Projects with writers
    let scienceProjects = science_seeder([cs1], nonFirebaseWriters),
        foodDrinkProjects = foodDrink_seeder([cs1, cs2, cs3], [w1, w2]),
        computersElectronicsProjects = computersElectronics_seeder([cs2, cs3], [cs2, cs3])

    let seededProjects = scienceProjects.concat(foodDrinkProjects, computersElectronicsProjects)

    return seededProjects
}
