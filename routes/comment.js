const express = require('express');

const commentController = require('../controllers/commentController');

const router = express.Router();

router.route('/comments').post(commentController.createComment);

module.exports=router;