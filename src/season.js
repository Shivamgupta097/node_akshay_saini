const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');
const app = express();
const port = 3000;


// app.use('/client', (req,res, next) =>{
//     console.log("Hello");
//     next();
//     // res.send("Hello testing the route")
// })

// app.get("/client", (req,res,next) =>{
//     res.send("<i><b>Hello i am here </b></i>")
// })
app.use("/admin" , adminAuth) 
/**  when to user userAuth middleware 
 * 1. when routes will be multiple 
 * Like /user/getAllData
 *   /user/getSubscripltion
 *   /user/getNotification
 * 
 * then we can use userAuth middleware for authenticaton 
 * app.use("/user" , userAuth)
 * 
 * 
  */

app.get('/admin/getAllData' , (req,res) => {
    console.log("Hello testing")
    res.send("GET All data successfully");
})

app.get('/user' , (req,res) => {
    console.log("Hello testing user")
    res.send("GET All user successfully");
})

app.get('/admin/deleteUser' , (req,res) => {
    res.send("Deleted successfully")
})

app.listen(port, () =>{
    console.log("Listening on port ", port)
});



