const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', userController.login);
router.post('/signup',userController.signup);
router.post('/forgotpassword',userController.forgotpassword);
router.put('/editProfile/:id',userController.editProfile);
router.get('/me',userController.getMe);
router.post('/changepassword',userController.changePassword);

module.exports = router;
