const express = require('express');
const bcrypt = require('bcrypt')
const connectDB = require('./config/database');
const PORT = 7777;
const cookieParser = require('cookie-parser');
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
// const requestRouter = require("./routes/request");

const app = express();
app.use(express.json())
app.use(cookieParser())

app.use("/" , authRouter);
app.use("/" , profileRouter)

/** SERVER LISTENING */
connectDB().then(() => {
    console.log("Connection Esatblished");

    app.listen(PORT, () => {
        console.log("Listening on PORT", PORT)
    })
}).catch(error => {
    console.error("error", error)
})