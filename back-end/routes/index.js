var express = require('express');
var router = express.Router();
const auth_controller = require('../controllers/auth_controller');

/* Sign Up */
router.post('/signup', auth_controller.signUp)

module.exports = router;
