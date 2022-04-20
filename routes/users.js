const express = require('express');

const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', userController.login);
router.post('/signup',userController.signup);
router.post('/forgot-password',userController.forgotpassword);
router.post('/reset-password/:token',userController.resetpassword);
router.put('/editProfile/:id',userController.editProfile);
router.get('/me',userController.getMe);
router.get('/searchUser/:id', userController.searchUser);
router.post('/change-password',auth,userController.changePassword);
router.post('/google-login',userController.googleLogin);

module.exports = router;
