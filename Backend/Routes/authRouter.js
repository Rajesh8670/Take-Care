const express = require('express');
const authController = require('../Controllers/authController');

const takeCareRoute = express.Router();
takeCareRoute.post('/verify-otp', authController.getOtp);
takeCareRoute.post('/check-otp', authController.checkOtp);
takeCareRoute.post('/create-account',authController.createAccount);
takeCareRoute.post('/login', authController.login);
takeCareRoute.post('/reset-password', authController.resetPassword);



module.exports = takeCareRoute;