var express = require('express');
var router = express.Router();

const writer_controller = require('../controllers/writer_controller');

/* POST Writer add text. */
router.post('/writer/newText', writer_controller.addText)
router.get('/writer/:id/categories', writer_controller.getCategories)

module.exports = router;