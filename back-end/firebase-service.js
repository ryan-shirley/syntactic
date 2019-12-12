// Firebase 
var admin = require("firebase-admin");

var serviceAccount = require("./syntactic-iadt-year-4-fb-firebase-adminsdk-auth.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://syntactic-iadt-year-4-fb.firebaseio.com"
});

export default admin