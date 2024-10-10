const express = require("express");
const mongoose = require("mongoose");
const AuthRoutes = require("./routes/routes");
// Used to parse JSON payloads in incoming request
// make it available in req.body 
const bodyparser = require("body-parser");
const corse = require("cors");
require("dotenv").config();

const app = express();
app.use(corse());
app.use(bodyparser.json());

const PORT = process.env.PORT;

// Routes
app.use('/api', AuthRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Password Reset flow Deployed Successfully" });
})

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("MongoDB is connected");

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })

}).catch(error => {
    console.log("Connection was filed ", error.message);
})


