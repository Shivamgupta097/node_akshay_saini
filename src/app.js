const express = require('express')
const connectDB = require("./config/database")
const app = express();
const port = 3000;
require("./config/database")


connectDB().then(() =>{
    console.log("Database connection established");
    app.listen(port , () =>{
    console.log("Listening on port", port)
})
}).catch(error =>{
    console.error("Connection did not established" , error)
})






