const express = require('express');

const likeController = require('../controllers/likeController');
const auth=require('../middlewares/auth')

const router = express.Router();


router.post('/like/:id',auth,likeController.like);
module.exports = router;
