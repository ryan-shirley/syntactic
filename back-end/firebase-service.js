// Firebase 
var admin = require("firebase-admin");

var serviceAccount = process.env.GOOGLE_CREDENTIALS

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://syntactic-iadt-year-4-fb.firebaseio.com"
});

export default admin