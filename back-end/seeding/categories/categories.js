let science_seeder = require("./science")
let computersElectronics_seeder = require("./computersElectronics")
let foodDrink_seeder = require("./foodDrink")

module.exports = function seedCategories(writers) {
    // Create Writer Groups
    let writerGroup1 = writers.slice(0, 25),
        writerGroup2 = writers.slice(0, 25)

    // Seed Categories with writers
    let scienceWriters = science_seeder(writerGroup1),
        ComputersElectronicsWriters = computersElectronics_seeder(writerGroup1)

    let FoodDrinkWriters = foodDrink_seeder(writerGroup2)
    //     SportsWriters = FoodDrinkWriters,
    //     TravelWriters = FoodDrinkWriters,
    //     HomeGardenWriters = FoodDrinkWriters,
    //     HealthWriters = FoodDrinkWriters

    // let BusinessIndustrialWriter = writers.slice(0, 25),
    //     PeopleSocietyWriters = BusinessIndustrialWriter,
    //     OnlineCommunitiesWriters = BusinessIndustrialWriter,
    //     NewsWriters = BusinessIndustrialWriter

    let seededCategories = scienceWriters.concat(ComputersElectronicsWriters, FoodDrinkWriters)

    return seededCategories
}
