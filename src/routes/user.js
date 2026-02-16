const express = require("express");
const userRouter = express.Router()
const user = require('../middlewares/auth');
const ConnectionRequest = require("../models/connectionRequest");
const User  = require("../models/user")

/**
 *GET /user/connection
* GET /user/request/recieved
* GET /user/feed  
* 
*/

const USER_DATA_NEED_TO_SHOW = ['firstName', 'lastName', 'photoUrl', 'age', 'gender', 'about', 'skills']

userRouter.get("/user/connection", user.userAuth, async (req, res) => {

    try {
        const { userData } = req;
        //     const connectionList = await ConnectionRequest.find({
        //          $or, [{ toUserId: userData?._id, status: "accepted" },
        //              { toUserId: userData?._id, status: "accepted" }]
        // })
        const connectionList = await ConnectionRequest.find({
            $or: [
                { toUserId: userData?._id, status: "accepted" },
                { fromUserId: userData?._id, status: "accepted" }
            ]
        });
        if (!connectionList.length) {
            throw new Error('No request found')
        }
        res.status(200).json({ message: "connection list found", data: connectionList })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

userRouter.get("/user/request/recieved", user.userAuth, async (req, res) => {

    try {
        const { userData } = req;

        const requestList = await ConnectionRequest.find({
            toUserId: userData?._id,
            status: "interested"
        }).populate("fromUserId", USER_DATA_NEED_TO_SHOW)
            .populate("toUserId", USER_DATA_NEED_TO_SHOW)

        if (!requestList.length) {
            throw new Error('No request found')
        }

        res.status(200).json({ message: "Request user list found", data: requestList })
    } catch (error) {
        console.error("error", error);
        res.status(400).json({ message: error.message })
    }

})

userRouter.get("/user/feed", user.userAuth, async(req, res) =>{
    try{
        const loggedInUser = req.userData;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {fromUserId : loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select(["fromUserId" , "toUserId"])
        // .populate("fromUserId","firstName")
        // .populate("toUserId","firstName")

        // console.log("connectionRequest", connectionRequests)

        const hideUsersFromFeed =  new Set();
        connectionRequests.forEach(req => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString())
        })

        const users = await User.find({
           $and: [
            {_id :{$nin: Array.from(hideUsersFromFeed)},},
            {_id:{$ne: loggedInUser._id}},
        ],
        }).select(USER_DATA_NEED_TO_SHOW)

        res.send(users);
    }catch(error){
        console.error("error" ,error)
    }
})

module.exports = userRouter;


