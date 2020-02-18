require("dotenv").config()
var fs = require("fs")
fs.writeFile("./google-nlp-service.json", process.env.GCP_NLP_CRED, err => {})
fs.writeFile("./firebase-storage-service.json", process.env.FIREBASE_AUTH_SERVICE_ACCOUNT, err => {})
