var express = require('express');

var router = express.Router();

var controller = require('../../controllers/v1/userController');


router.post('/', controller.create);

router.get('/:userId/posts', controller.getUserPosts);

router.get('/:id', controller.retrieve);

router.patch('/:id', controller.update);




module.exports = router;