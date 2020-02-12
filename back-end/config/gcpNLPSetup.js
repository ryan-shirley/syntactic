var fs=require('fs');
fs.writeFile('./google-nlp-service.json', process.env.GCP_NLP_CRED, (err) => {});