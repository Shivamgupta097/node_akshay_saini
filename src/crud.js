const express = require('express');
const connectDB = require('./config/database');
const User = require("./models/user")
const PORT = 7777;

const app = express();
app.use(express.json())


/**
 * CRUD Operation
 * 1. To sign-up the user
 * 2. To get User List
 * 3. To get single user info
 * 4. to find and delete one user from the list
 * 5. to find and update on user from the list
 * 
 */


/* TO sign up user */

app.post("/sign-up", async (req, res) => {
    const userData = req.body;

    try {
        if (userData) {
            const user = new User(userData);
            console.log("req", req.body)
            await user.save()
            res.status(200).json({ message: "User added successfuly", data: user });
        } else {
            return res.status(400).json({ message: "No data inserted" })
        }

    } catch (error) {
        console.error("error", error)
    }
})

/** TO get detail of single user */
app.get('/user', async(req,res) =>{
  const userId = req.body.userId

  try{
    if(userId){
        const userData = await User.findOne({_id:userId})
        res.status(200).json({data:userData})
    }else{
        res.status(400).json({message:"No user found"})
    }
  }catch(error){
        res.status(400).json({message:"Something went wrong"})
  }
})


/** Update user data */
app.patch("/user", async(req, res) =>{
    // const userId = req.body.userId;
    const {userId ,...rest} = req.body

    try{
        const userData = await User.findByIdAndUpdate(userId, rest)
        res.status(200).json({data :userData , message:"User updated successfully"})
    }catch(error){
        console.error("error" , error)
        res.status(400).json({message:"something went wrong"})
    }
})

/**To get list of users */

app.get('/feed', async(req,res) =>{
 try{
    const userList = await User.find({});
    res.status(200).json({data:userList})

 }catch(error){
    res.status(400).json({message:"Something went wrong"})
 }
})

/** To delete particular user */

app.delete('/user' , (req,res) =>{
    const userId = req.body.userId;

    try{
        const userData = User.findByIdAndDelete(userId);
        res.status(400).json({message:"User deleted successfully"})
    }catch(error){
        console.error("error" , error)
        res.status(400).json({message:"something went wrong"})

    }
})








/** SERVER LISTENING */
connectDB().then(() => {
    console.log("Connection Esatblished");

    app.listen(PORT, () => {
        console.log("Listening on PORT", PORT)
    })
}).catch(error => {
    console.error("error", error)
})