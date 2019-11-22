var express = require('express');
var router = express.Router();

/* POST Writer onboarding complete. */
router.post('/writer', function (req, res) {

    const data = req.body

    const bio = data.bio
    const texts = data.texts
    const links = data.links

    res.send({ 
        body: 'Got a POST request'
    })
})

module.exports = router;
