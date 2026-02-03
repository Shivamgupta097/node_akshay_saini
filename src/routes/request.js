const express = require('express');
const requestRouter = express.Router();
const auth = require("../middlewares/auth");
const User = require('../models/user');
const ConnectionRequest = require("../models/connectionRequest")

requestRouter.post("/request/send/:status/:toUserId", auth.userAuth, async (req, res) => {

    try {
        const fromUserId = req.userData._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status

        /**
         * 1. fromUserId and toUserId both are same.
         * 2. toUserId is not valid .
         * 3. status is apart from 'accepted or reject or interest or ignored .   
         */

        if (fromUserId === toUserId) {
            throw new Error('Connection request failed')
        }

        // This api is for ignored/interested status
        /**
         * 1. if i am sending request this api is for  [interested/ignored]
         * 2. if i am recieving the request from other [accepted/rejected]
         */

        const allowedStatus = ["ignored", "interested"]

        const isAllowedStatus = allowedStatus.includes(req.params.status);

        if (!isAllowedStatus) {
            throw new Error("Status " + status + " is not permitted")
        }

        const isConnectionsExist = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
        ]});

        if(isConnectionsExist){
            throw new Error("This connection request already exist")
        }

        const toUserIdData = await User.findById(toUserId)
        if (toUserIdData) {
            /** toUserId !== null , toUserId is not valid */
            const connectionRequestData = await new ConnectionRequest({
                fromUserId,
                toUserId,
                status
            })
            await connectionRequestData.save()
            res.status(200).json({
                message: "Connection request established",
                data: connectionRequestData
            })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
        console.error("Error :", error)
    }
})

module.exports = requestRouter