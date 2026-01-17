const express = require('express')
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
app.use("/admin" , (req,res, next)=>{
    console.log("Admin auth is getting checked")
    let token = 'xyz';
    let isAutherized = token !== "xyz"
    if(isAutherized){
     next()
    }else{
       res.status(401).json({message :"Unautherized"})
    }
})
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



