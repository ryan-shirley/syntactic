let science_seeder = require("./science")

module.exports = function seedCategories(writers) {
    // Create Writer Groups
    let scienceWriters = science_seeder(writers.slice(0, 25)),
        ComputersElectronicsWriters = scienceWriters,
        GamesWriters = scienceWriters

    // let FoodDrinkWriters = writers.slice(0, 25),
    //     SportsWriters = FoodDrinkWriters,
    //     TravelWriters = FoodDrinkWriters,
    //     HomeGardenWriters = FoodDrinkWriters,
    //     HealthWriters = FoodDrinkWriters

    // let BusinessIndustrialWriter = writers.slice(0, 25),
    //     PeopleSocietyWriters = BusinessIndustrialWriter,
    //     OnlineCommunitiesWriters = BusinessIndustrialWriter,
    //     NewsWriters = BusinessIndustrialWriter

    return scienceWriters
}
