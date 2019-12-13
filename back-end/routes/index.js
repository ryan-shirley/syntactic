var express = require('express');
var router = express.Router();
const auth_controller = require('../controllers/auth_controller');


/* GET home page. */
router.get('/', function (req, res) {
    res.send({ 
        body: 'Hello world!' 
    })
})

/* Sign Up */
router.post('/signup', auth_controller.signUp)

module.exports = router;
