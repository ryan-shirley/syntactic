let science_seeder = require("./science")
let computersElectronics_seeder = require("./computersElectronics")
let foodDrink_seeder = require("./foodDrink")
let sports_seeder = require("./sports")

module.exports = function seedCategories(writers) {
    // Create Writer Groups
    let writerGroup1 = writers.splice(0, 25),
        writerGroup2 = writers

    // Seed Categories with writers
    let scienceWriters = science_seeder(writerGroup1),
        ComputersElectronicsWriters = computersElectronics_seeder(writerGroup1),
        FoodDrinkWriters = foodDrink_seeder(writerGroup2),
        SportsWriters = sports_seeder(writerGroup2)
    //     TravelWriters = FoodDrinkWriters,
    //     HomeGardenWriters = FoodDrinkWriters,
    //     HealthWriters = FoodDrinkWriters

    // let BusinessIndustrialWriter = writers.splice(0, 25),
    //     PeopleSocietyWriters = BusinessIndustrialWriter,
    //     OnlineCommunitiesWriters = BusinessIndustrialWriter,
    //     NewsWriters = BusinessIndustrialWriter

    let seededCategories = scienceWriters.concat(ComputersElectronicsWriters, FoodDrinkWriters, SportsWriters)

    return seededCategories
}
