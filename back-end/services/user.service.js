const User = require("../models/user.model")
import admin from "../config/firebase-service"

/**
 * signUp() Saves new user into Monogo
 */
exports.signUp = async userDTO => {
    const { first_name, last_name, email, uid, role } = userDTO

    try {
        // Create new user in Mongo DB
        const mongoUser = new User({
            first_name,
            last_name,
            email,
            completed_onboarding: false,
            uid,
            role: [
                {
                    name: role
                }
            ]
        })

        const newUser = await mongoUser.save()

        return newUser
    } catch (err) {
        console.log(err.errors)
        throw err
    }
}

/**
 * getCurrentUser() Get currently logged in user
 */
exports.getCurrentUser = async authToken => {
    try {
        // Get uid for user from firebase
        const userInfo = await admin.auth().verifyIdToken(authToken)
        const uid = userInfo.uid

        // Get user data from mongo
        return await User.findOne({ uid })
    } catch (err) {
        console.log(err)
        throw err
    }
}

/**
 * getUser() Get user
 */
exports.getUser = async id => {
    // Get user data from mongo
    let user = await User.findOne({ _id: id }).then(function(user) {
        return user
    })

    return user
}

/**
 * updateLevels() Update users levels
 */
exports.updateLevels = async (newLevels, userId) => {
    const user = await User.findOne({ _id: userId })

    // Add levels to user
    if (user.levels) {
        // Has Levels
        for (var i = 0; i < newLevels.length; i++) {
            let newCat = newLevels[i]

            let updated = false

            for (var j = 0; j < user.levels.length; j++) {
                let cat = user.levels[j]

                // Existing level found so update
                if (cat.category === newCat.category) {
                    user.levels[j].level = newCat.level
                    updated = true
                    break
                }
            }

            // Wasn't found | Add New
            if (!updated) {
                user.levels.push(newCat)
            }
        }
    } else {
        // No previous levels
        user.levels = newLevels
    }

    return await user.save()
}

/**
 * patchUpdate() Partly update user profile
 */
exports.patchUpdate = async (oldUser, userDTO) => {
    const { newBio, newBusiness, newOnboardingStatus } = userDTO

    User.findOneAndUpdate(
        { _id: oldUser._id },
        {
            "profile.bio": newBio || oldUser.profile.bio,
            "profile.business": newBusiness || oldUser.profile.business,
            completed_onboarding:
                newOnboardingStatus || oldUser.completed_onboarding
        },
        (err, doc) => {
            if (err) return err
            return doc
        }
    )
}
