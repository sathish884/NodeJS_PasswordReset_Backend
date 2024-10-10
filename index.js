const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/routes");
// Used to parse JSON payloads in incoming request
// make it available in req.body 
const bodyParser = require("body-parser");
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Password Reset flow Deployed Successfully" });
})

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("MongoDB was connected");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch(error => {
    console.log("Connection failed", error.message);
});


