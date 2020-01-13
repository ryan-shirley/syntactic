// Firebase 
var admin = require("firebase-admin");

var serviceAccount = process.env.FIREBASE_AUTH_SDK; // SYNTACTIC_YEAR_4_FIREBASE_ADMIN_SDK_AUTH

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://syntactic-iadt-year-4-fb.firebaseio.com"
});

export default admin