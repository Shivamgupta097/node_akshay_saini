const express = require('express');
const connectDB = require('./config/database');
const PORT = 7777;
const cookieParser = require('cookie-parser');
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require('./routes/request');
const userRouter = require("./routes/user");
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/" , authRouter);
app.use("/" , profileRouter)
app.use("/" , requestRouter)
app.use("/" , userRouter)


/** SERVER LISTENING */
connectDB().then(() => {
    console.log("Connection Esatblished");

    app.listen(PORT, () => {
        console.log("Listening on PORT", PORT)
    })
}).catch(error => {
    console.error("error", error)
})