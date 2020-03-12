let science_seeder = require("./science")

module.exports = function seedCategories(users) {
    // Create Writer Groups
    let scienceWriters = science_seeder(users.slice(0, 25)),
        ComputersElectronicsWriters = scienceWriters,
        GamesWriters = scienceWriters

    // let FoodDrinkWriters = users.slice(0, 25),
    //     SportsWriters = FoodDrinkWriters,
    //     TravelWriters = FoodDrinkWriters,
    //     HomeGardenWriters = FoodDrinkWriters,
    //     HealthWriters = FoodDrinkWriters

    // let BusinessIndustrialWriter = users.slice(0, 25),
    //     PeopleSocietyWriters = BusinessIndustrialWriter,
    //     OnlineCommunitiesWriters = BusinessIndustrialWriter,
    //     NewsWriters = BusinessIndustrialWriter

    return scienceWriters
}
