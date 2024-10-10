const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String },
})

const User = mongoose.model("User", userShema);

module.exports = User;