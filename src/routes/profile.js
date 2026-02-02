const express = require('express');
const profileRouter = express.Router();
const auth  = require("../middlewares/auth");
const {validEditProfileData} = require("../utils/validations");
const User = require("../models/user");

profileRouter.get('/profile/view', auth.userAuth, async (req, res) => {

    try {
        const userObj = req.userData;
        res.send(userObj)

    } catch (error) {
        console.error(error.message)
        res.status(400).json({ message: error.message })
    }
})

profileRouter.patch("/profile/edit", auth.userAuth, async(req,res) => {
    try{
        const {_, userData} = req
        if(!validEditProfileData(req)){
            throw new Error("Invalid edit request")
        }

        if(req.userData){
            const user = await User.findByIdAndUpdate({_id:userData._id}, req.body );
            if(!user){
                throw new Error('User does not found')
            }
            res.status(200).json({message:"User updated successfully"})

        }else{
            res.status(400).json({message:"token is not valid"})
        }
    }catch(error){
        res.status(400).json("Error :", error.message)
        console.error(error)
    }
})

module.exports = profileRouter


