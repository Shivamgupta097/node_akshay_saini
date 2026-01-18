const express = require('express');
// const { adminAuth, userAuth } = require('./middlewares/auth');
const app = express();
const port = 3000;

app.use("/", (error , req, res,next) =>{
    console.log("Hello")
    try {
        throw new error
    } catch (err) {
        console.log({"means" :error})
        next(error)
    }
})  

app.get('/getUserData', (req,res,next) =>{
    try{
    throw new Error("Testing")
    }catch(error){
        console.error(error)
        // // res.status(500).send()
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
})

app.listen(port , () =>{
    console.log("server is running on port" , port )
})