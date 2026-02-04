const express = require("express");
const userRouter = express.Router()
const user = require('../middlewares/auth');
const ConnectionRequest = require("../models/connectionRequest");

/**
 *GET /user/connection
* GET /user/request/recieved
* GET /user/feed  
* 
*/

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
        }).populate("fromUserId", ['firstName', 'lastName', 'photoUrl'])
            .populate("toUserId", ['firstName', 'lastName', 'photoUrl'])

        if (!requestList.length) {
            throw new Error('No request found')
        }

        res.status(200).json({ message: "Request user list found", data: requestList })
    } catch (error) {
        console.error("error", error);
        res.status(400).json({ message: error.message })
    }

})

module.exports = userRouter;


