const express = require('express')
const app = express();
const port = 3000;


app.use("/" , (req, res, next) =>{
    res.send("1 send Hello from the server middleware");
    next();
});

app.use("/test" , (req, res,next) =>{
    res.send("2 send Hello from the server middleware");
    // next();
})

app.use("post" , (req, res, next) =>{
    res.send("3 send Hello from the server middleware");
    // next();
})

app.listen(port, () =>{
    console.log("Listening o port ", port)
});



