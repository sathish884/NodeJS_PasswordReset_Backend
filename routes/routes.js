// const express = require("express");
// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const router = express.Router();
// const nodemailer = require("nodemailer")


const express = require('express');
const authcontroller = require('../controllers/authControllers');

const router = express.Router();

router.post('/register', authcontroller.registerUser);
router.post('/login', authcontroller.login);
router.post('/forgot-password', authcontroller.forgotPassword);
router.post('/token-verify', authcontroller.tokenVerify);
router.post('/reset-password', authcontroller.resetPassword);


module.exports = router;

// // Register User
// router.post("/userRegister", async (req, res) => {
//     const { name, email, password } = req.body
//     try {
//         const existUser = await User.findOne({ email })
//         if (existUser) {
//             return res.status(401).json({ message: "User already exists" })
//         };
//         const hashPassword = new bcrypt.hash(password, 10);
//         const newUser = await User({ name, email, password: hashPassword })
//         await newUser.save();
//         res.status(200).json({ message: "User successfully register" });
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })


// // login user
// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     try {

//         const user = await User.findOne({ email });
//         if (!email) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             return res.status(401).json({ message: "Invalid password" })
//         }

//         const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "5m" })
//         res.status(200).json({ token })

//     } catch (error) {
//         res.status(500).json({ message: "Internal server error" })
//     }
// })

// // Forget password
// router.post("/forget-password", async (req, res) => {
//     const { email } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             res.status(404).json({ message: "User not found" });
//         }
//         const randomToken = Math.random().toString(36).slice(-8);
//         user.resetPasswordToken = randomToken;
//         user.resetPasswordExpire = Date.now() + 3600000; // 1 hour 
//         await user.save();
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 // Go to your Google account at https://myaccount.google.com/
//                 // Go to Security
//                 // Choose 2-Step Verification - here you have to verify yourself, in my case it was with phone number and a confirmation code send as text message.After that you will be able to enabled 2-Step Verification
//                 // Visit https://myaccount.google.com/apppasswords to create your app.
//                 // Put a name e.g.nodemailer to your app and create it.
//                 // A modal dialog will appear with the password.Get that password and use it in your code.

//                 // original password - Sathish199600@M
//                 user: "sathish001996m@gmail.com",
//                 pass: "wikblesusrhqhrlh"
//             }
//         })
//         const msg = {
//             from: "sathish001996m@gmail.com",
//             to: user.email,
//             subject: "Password reset request",
//             text: `You are receiving this email because you has requested a password reset for your account. \n\ Please use the following token to reset your password: ${token} \n\n If you didn't request a password reset, please ignore this email.`
//         }
//         transporter.sendMail(msg, (err, info) => {
//             if (err) {
//                 res.status(404).json({ message: "Somthing went wrong, pls try again !" });
//             }
//             res.status(200).json({ message: "Email sent" + info.response })
//         });

//     } catch (error) {
//         res.status(500).json({ message: "Internal server error" })
//     }
// });

// // Reset password
// router.post("/reset-password", async (req, res) => {
//     const { token, password, confirmPassword } = req.body;
//     try {
//         const user = await User.findOne({
//             resetPasswordToken: token,
//             resetPasswordExpire: { $gt: Date.now() }
//         });
//         if (!user) {
//             return res.status(404).json({ message: "Invalid token" })
//         }
//         if (password !== confirmPassword) {
//             return res.status(401).json({ message: "Confirm password are mismatch" })
//         }
//         const hashPassword = await bcrypt.hash(password, 10);
//         const hashConfirmPassword = await bcrypt.hash(confirmPassword, 10);
//         user.password = hashPassword;
//         user.confirmPassword = hashConfirmPassword
//         user.resetPasswordToken = null;
//         user.resetPasswordExpire = null;
//         await user.save();
//         res.status(200).json({ message: "Password reset successfully" })
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error" })
//     }
// })


module.exports = router;