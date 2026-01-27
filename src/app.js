const express = require('express')
const connectDB = require("./config/database");
const User = require('./models/user');
const app = express();
const port = 3000;
require("./config/database")


app.use(express.json())
app.post("/sign-up", async (req, res) => {

    try {
        const user = new User(req.body)

        console.log("req", req.body)
        await user.save();
        res.send("User added successfully")
    } catch (error) {
        res.status(400).send("Error saving the user:", err.message)
    }
})

connectDB().then(() => {
    console.log("Database connection established");
    app.listen(port, () => {
        console.log("Listening on port", port)
    })
}).catch(error => {
    console.error("Connection did not established", error)
})






