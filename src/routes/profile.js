const express = require('express');
const profileRouter = express.Router();
const auth  = require("../middlewares/auth")

profileRouter.get('/profile', auth.userAuth, async (req, res) => {

    try {
        const userObj = req.userData;
        res.send(userObj)

    } catch (error) {
        console.error(error.message)
        res.status(400).json({ message: error.message })
    }

})

module.exports = profileRouter


