const express = require('express');

const likeController = require('../controllers/likeController');
const auth=require('../middlewares/auth')

const router = express.Router();
const auth=require('../middlewares/auth')

router('/like',auth,likeController.like);
