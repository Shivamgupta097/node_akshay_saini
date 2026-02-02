// const express = require('express');
// const userRouter = express.Router()


// /** TO get detail of single user */
// userRouter.get('/user', async (req, res) => {
//     const userId = req.body.userId

//     try {
//         if (userId) {
//             const userData = await User.findOne({ _id: userId })
//             res.status(200).json({ data: userData })
//         } else {
//             res.status(400).json({ message: "No user found" })
//         }
//     } catch (error) {
//         res.status(400).json({ message: "Something went wrong" })
//     }
// })

// const allowedUpdates = ["userId", "age", "about", "photoUrl", "skills", "gender"]


// /** Update user data */
// userRouter.patch("/user", async (req, res) => {
//     // const userId = req.body.userId;
//     const { userId, ...rest } = req.body

//     // const isAllowedUpdates = Object.keys(req.body).every(cur => allowedUpdates.includes(cur));
//     let isAllowedUpdates = false;
//     let obj = {};

//     for (let key in req.body) {
//         allowedUpdates.forEach((cur) => {
//             if (cur === key) {
//                 // "userId" , "email" // it should not update 
//                 isAllowedUpdates = true
//                 obj[cur] = rest[cur]
                
//             }
//         })
//     }

//     console.log("obj" , obj ,req.body)

//     try {
//         if (!isAllowedUpdates) {
//             throw new Error("Your custom error message here");
//         }

//         if (req.body.skills.length > 10) {
//             throw new Error("Skills can not be update more than 10 ")
//         }
//         const userData = await User.findByIdAndUpdate(userId, rest)
//         res.status(200).json({ data: userData, message: "User updated successfully" })

//     } catch (error) {
//         console.error("error", error)
//         res.status(400).json({ message: error.message })
//     }
// })

/** Update user data */
// app.patch("/user", async (req, res) => {
//     try {
//         const { userId, ...updates } = req.body;

//         if (!userId) {
//             throw new Error("userId is required");
//         }

//         const updateKeys = Object.keys(updates);

//         // ❗ Reject if any field is not allowed
//         const isAllowed = updateKeys.every(key =>
//             allowedUpdates.includes(key)
//         );

//         if (!isAllowed) {
//             throw new Error("Invalid fields in update request");
//         }

//         // Skills validation
//         if (updates.skills && updates.skills.length > 10) {
//             throw new Error("Skills cannot be more than 10");
//         }

//         const userData = await User.findByIdAndUpdate(
//             userId,
//             updates,
//             {
//                 new: true,           // return updated doc
//                 runValidators: true  // apply schema validation
//             }
//         );

//         if (!userData) {
//             throw new Error("User not found");
//         }

//         res.status(200).json({
//             data: userData,
//             message: "User updated successfully"
//         });

//     } catch (error) {
//         console.error("error", error);
//         res.status(400).json({ message: error.message });
//     }
// });


// /**To get list of users */

// userRouter.get('/feed', async (req, res) => {
//     try {
//         const userList = await User.find({});
//         res.status(200).json({ data: userList })

//     } catch (error) {
//         res.status(400).json({ message: "Something went wrong" })
//     }
// })

// /** To delete particular user */
// userRouter.delete('/user', (req, res) => {
//     const userId = req.body.userId;
//     try {
//         const userData = User.findByIdAndDelete(userId);
//         res.status(400).json({ message: "User deleted successfully" })
//     } catch (error) {
//         console.error("error", error)
//         res.status(400).json({ message:error.message })
//     }

// })