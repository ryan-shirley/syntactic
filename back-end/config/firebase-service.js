// Firebase
require("dotenv").config()
var admin = require("firebase-admin")

// var serviceAccount = require("./google-credentials.json"); // SYNTACTIC_YEAR_4_FIREBASE_ADMIN_SDK_AUTH

var serviceAccount = JSON.parse(process.env.FIREBASE_AUTH_SERVICE_ACCOUNT)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://syntactic-iadt-year-4-fb.firebaseio.com"
})

export default admin
