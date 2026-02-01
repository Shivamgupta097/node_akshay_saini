const express = require("express")
const authRouter = express.Router();
const User = require("../models/user")

authRouter.post("/sign-up", async (req, res) => {
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
        console.error("error", error);
        return res.status(400).json({ message: error })
    }
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {

        if (!email && !password) {
            return res.status(400).json({ message: 'Email and password is required !' })
        }

        const userObject = await User.findOne({ email: email })

        if (!userObject) {
            throw new Error("User is not able to detect here")
        }

        console.log("user object", userObject)

        const isPasswordValid = await bcrypt.compare(password, userObject.password);
        if (isPasswordValid) {
            const token = await jwt.sign({ email: email }, "DEV@1234", { expiresIn: "8h" });
            console.log("token", token)
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 8 * 60 * 60 * 1000
            });
            res.status(200).json({ message: "Login successful" });


        } else {
            return res.status(400).json({ message: 'Password is required !' })
        }

    } catch (error) {
        console.log(error.message)
    }


})

module.export = {
    authRouter
}