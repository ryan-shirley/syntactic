// Firebase 
var admin = require("firebase-admin");

// var serviceAccount = require("./syntactic-iadt-year-4-fb-firebase-adminsdk-auth.json"); // SYNTACTIC_YEAR_4_FIREBASE_ADMIN_SDK_AUTH

admin.initializeApp({
  credential: admin.credential.cert({
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: "https://syntactic-iadt-year-4-fb.firebaseio.com"
});

export default admin