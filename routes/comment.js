const express = require('express');

const commentController = require('../controllers/commentController');
const auth=require('../middlewares/auth')

const router = express.Router();

router.route('/comments').post(auth,commentController.createComment);


router.route('/:id/comments').get(commentController.listComment)
.put(auth,commentController.update)
.delete(auth,commentController.delete);

module.exports=router;