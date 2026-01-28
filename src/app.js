const express = require('express')
const connectDB = require("./config/database");
const User = require('./models/user');
const app = express();
const port = 3000;
require("./config/database");


app.use(express.json())

// app.get('/user' , async(req, res) => {
//     const userId = req.body.emailId

//     try {
//         const user = await User.findOne({emailId:userId})
//             console.log("userId" , userId, user)

//         if(user){
//             console.log("userId" , userId, data)
//             res.status(200).json(data)
//         } else{
//             res.send("User not found")
//         }

//     } catch (error) {
//         res.status(400).send("Something went wrong")
//     }

// })

app.get('/user', async(req, res) =>{
    const emailId = req.body.emailId
    try {
        const user = await User.findOne({emailId:emailId});

        if(user){
            res.status(200).json(user)
        }else{
            res.status(400).json({message:"User not found"})
        }
        
    } catch (error) {
        res.status(400).json({message:"Something went wrong"})
    }
})
app.get('/feed', async(req,res) =>{
    try{
        const data = await User.find({});
        console.log(data)
        res.status(200).json(data)
    }catch(error){
        res.status(400).send("Something went wrong")
    }

})

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






