const express = require('express');
const bcrypt = require('bcrypt')
const connectDB = require('./config/database');
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validations")
const PORT = 7777;
var cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken");
const validator = require("validator")
const auth = require("./middlewares/auth")

const app = express();
app.use(express.json())
app.use(cookieParser())

app.use(cookieParser())



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

    /**
     * 1. Validation of data
     * 2. Encrypt of password
     * 3. Create the instance of User model
     */

    try {
        //validation of data
        validateSignUpData(req);

        const { password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const userData = { ...req.body, password: passwordHash };

        //encrypt the password
        if (userData) {
            const user = new User(userData);
            console.log("req", req.body)
            await user.save()
            res.status(200).json({ message: "User added successfuly", data: user });
        } else {
            res.status(400).json({ message: "No user found" })
        }
    } catch (error) {
        res.status(400).json({ message: "Something went wrong" })

    }
})

app.get('/profile', auth.userAuth, async (req, res) => {

    try {
        const userObj = req.userData;
        res.send(userObj)

    } catch (error) {
        console.error(error.message)
        res.status(400).json({ message: error.message })
    }

})


app.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const userDetails = await User.findOne({ email: email })
        if (!userDetails) {
            throw new Error("Invalid credential")
        }
        //const isPasswordValid = await bcrypt.compare(password, userDetails.password);
        //  const isPasswordValid = await bcrypt.compare(password, userDetails.password);
        const isPasswordValid = await userDetails.validatePassword(req.body)

        if (!isPasswordValid) {
            throw new Error("Please enter correct password")
        } else {

            /**
             * Create the JWT token *
             * 
             * */

            const token = await userDetails.getJWT()
            // const token = await jwt.sign({ _id: userDetails._id }, "DevTinder$7999", {
            //     expiresIn:"7d"
            // })

            // Add the token to cookie and send the response back to the user
            res.cookie('token', token, {
                expiresIn: new Date() + 8 * 3600000
            })

            console.log("login", token)
            res.send("Login successfully")
        }

    } catch (error) {
        console.error("error", error)
        res.status(400).json("something went wrong", error.message)
    }
})

/** TO get detail of single user */
app.get('/user', async (req, res) => {
    const userId = req.body.userId

    try {
        if (userId) {
            const userData = await User.findOne({ _id: userId })
            res.status(200).json({ data: userData })
        } else {
            res.status(400).json({ message: "No user found" })
        }
    } catch (error) {
        res.status(400).json({ message: "Something went wrong" })
    }
})

const allowedUpdates = ["userId", "age", "about", "photoUrl", "skills", "gender"]


/** Update user data */
app.patch("/user", async (req, res) => {
    // const userId = req.body.userId;
    const { userId, ...rest } = req.body

    // const isAllowedUpdates = Object.keys(req.body).every(cur => allowedUpdates.includes(cur));
    let isAllowedUpdates = false
    for (let elm in req.body) {
        allowedUpdates.forEach((cur) => {
            if (cur === elm) {
                // "userId" , "email" // it should not update 
                isAllowedUpdates = true
            }
        })
    }

    try {
        if (!isAllowedUpdates) {
            throw new Error("Your custom error message here");
        }

        if (data.skills.length > 10) {
            throw new Error("Skills can not be update more than 10 ")
        }
        const userData = await User.findByIdAndUpdate(userId, rest)
        res.status(200).json({ data: userData, message: "User updated successfully" })

    } catch (error) {
        console.error("error", error)
        res.status(400).json({ message: error.message })
    }
})

/**To get list of users */

app.get('/feed', async (req, res) => {
    try {
        const userList = await User.find({});
        res.status(200).json({ data: userList })

    } catch (error) {
        res.status(400).json({ message: "Something went wrong" })
    }
})

/** To delete particular user */
app.delete('/user', (req, res) => {
    const userId = req.body.userId;
    try {
        const userData = User.findByIdAndDelete(userId);
        res.status(400).json({ message: "User deleted successfully" })
    } catch (error) {
        console.error("error", error)
        res.status(400).json({ message: "something went wrong" })
        res.status(400).json({ message: "User deleted successfully" })
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