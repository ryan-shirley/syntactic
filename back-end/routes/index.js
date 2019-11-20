var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.send({ 
        body: 'Hello world!' 
    })
})

module.exports = router;
