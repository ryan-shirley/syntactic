var express = require('express');
var router = express.Router();
const nlp_controller = require('../controllers/google_nl_api.controller');

/* Sign Up */
router.post('/analyse-brief', nlp_controller.analyse)

module.exports = router;
