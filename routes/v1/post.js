var express = require('express');

var router = express.Router();

var controller = require('../../controllers/v1/postController');


router.post('/', controller.create);

router.get('/:id', controller.retrieve);


router.patch('/:id', controller.update);




module.exports = router;