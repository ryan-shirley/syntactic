var express = require('express');
var router = express.Router();

// Require the controllers
const onboarding_controller = require('../controllers/onboarding.controller');

/* POST Writer onboarding complete. */
router.post('/writer', async (req, res) => {
    // Data from request
    const data = req.body

    const bio = data.bio
    const texts = data.texts
    const links = data.links
    
    // TODO: catch errors (remove json file and test for errors)
    const categories = await classifyText(texts[0])

    // console.log('Categories');
    // categories.then(cat => {
    //     let { name, confidence } = cat
    //     console.log(`Name: ${name}, Confidence: ${confidence}.`);
    // })

    res.send({
        response: 'Woo! 😃 We were able to get the categories from the text you provided.',
        categories
    })
})

/* PUT Onboard content seeker. */
router.put('/content-seeker', onboarding_controller.onboard_content_seeker);

module.exports = router;