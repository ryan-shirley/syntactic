// Firebase 
var admin = require("firebase-admin");

// var serviceAccount = require("./syntactic-iadt-year-4-fb-firebase-adminsdk-auth.json"); // SYNTACTIC_YEAR_4_FIREBASE_ADMIN_SDK_AUTH

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://syntactic-iadt-year-4-fb.firebaseio.com"
});

export default admin