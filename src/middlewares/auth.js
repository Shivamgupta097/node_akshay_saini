const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async (req, res, next) => {

    try {
        const { token } = req.cookies

        if (!token) {
            return res.status(401).send("please login")
        }
        const decodeObj = await jwt.verify(token, "DevTinder$7999");
        if(!decodeObj){
            throw new error("User not found")
        }
        const userData = await User.findById(decodeObj?._id);
        if (!userData) {
            throw new Error("user did not founded")
        }

        req.userData = userData
        console.log("userData" , userData)

        next();
        //next is called to move the request handler to another api

    } catch (error) {
        console.error("error", error)
        // res.status(400)"Error ", error.message)
    }


}

module.exports = { userAuth }
