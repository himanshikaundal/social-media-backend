const express = require('express');

const commentController = require('../controllers/commentController');

const router = express.Router();

router.route('/comments').post(commentController.createComment);


router.route('/:id/comments').get(commentController.listComment)
.put(commentController.update)
.delete(commentController.delete);

module.exports=router;