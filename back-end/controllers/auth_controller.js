const User = require("../models/user.model")
import admin from "../firebase-service"

exports.signUp = async (req, res) => {
    const { first_name, last_name, email, password } = req.body

    try {
        // Create new user in Mongo DB
        const mongoUser = new User({
            first_name,
            last_name,
            email,
            completed_onboarding: false
        })

        const newUser = await mongoUser.save()

        // TODO: Set additional information for user like role or display name on Firebase
        // const user = await admin.auth().createUser({
        //     email,
        //     phoneNumber,
        //     password,
        //     displayName: `${firstName} ${lastName}`,
        //     photoURL: photoUrl
        //   });
        

        return res.status(201).json(userRecord)
    } catch (err) {
        // TODO: Handle Errors here
        console.log(err)

        console.log(err.errorInfo.message)

        res.status(400).json({ message: err.errorInfo.message })
    }
}
