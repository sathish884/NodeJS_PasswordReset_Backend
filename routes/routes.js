const express = require('express');
const authcontroller = require('../controllers/authControllers');

const router = express.Router();

router.post('/register', authcontroller.registerUser);
router.post('/login', authcontroller.login);
router.post('/forgot-password', authcontroller.forgotPassword);
router.post('/token-verify', authcontroller.tokenVerify);
router.post('/reset-password', authcontroller.resetPassword);

module.exports = router;
