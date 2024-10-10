const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require('../models/user');
const nodemailer = require('nodemailer')

// Register to the user
exports.registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({ message: "User successfully register" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// LOgin to the user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" })
        }

        res.status(200).json({ message: "Successfully login" })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
};

// Forget password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.save();

        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '5m',
        });

        user.resetPasswordToken = resetToken;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        const msg = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            text: `You are receiving this email because you has requested a password reset for your account. \n\ Please use the following token to reset your password: ${resetToken} \n\n If you didn't request a password reset, please ignore this email.`
        }

        transporter.sendMail(msg)

        res.status(200).json({ message: 'Password reset email sent', token: resetToken });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Token verify
exports.tokenVerify = async (req, res) => {
    const { token } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'Invalid token' });
        }

        await user.save();

        res.status(200).json({ message: 'Token verified successful' });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Reset password
exports.resetPassword = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = null;  // Assuming you have a reset token that should be cleared

        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};