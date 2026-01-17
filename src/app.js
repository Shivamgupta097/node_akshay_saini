const express = require('express')
const app = express();
const port = 3000;


// app.use("/" , (req, res, next) =>{
//     res.send("1 send Hello from the server middleware");
//     next();
// });

// app.use("/test" , (req, res, next) =>{
//     res.send("2 send Hello from the server middleware");
//     next();
// })

// app.use("/post" , (req, res) =>{
//     res.send("3 send Hello from the server middleware");
//     // next();
// })

// app.get('/user', (req, res) => {
//  res.send({
//     "name" :"Shivam",
//     age:"28"
//  })
// })

// app.post('/user' , (req,res) =>{
//   res.send("Data successfully saved to the database!")
// })

// app.use("/user", (req, res, next) =>{
//     console.log("ist route handler");
       
//     res.send("Ist route");
//     next();
//     console.log("Handeling")
 
// },(req,res)=>{
//  console.log("2nd route handlers")
//    res.send("2nd route");
// })

// app.patch('/user' , (req,res) =>{
//   res.send("Data successfully small update w.r.t user to the database!")
// })

// app.post("user", (req,res) =>{
//     res.send("Data successfully fully update w.r.t to user id")
// })

/**Multiple route handler */
// app.use("/user", [(req,res,next) =>{
//     console.log("Ist route handler");
//     next();
//      console.log("Ist ");
// },(req, res, next) =>{
//     console.log("2nd route handler");
//     next();
// },(req,res) =>{
//     console.log("3rd route handler");
//     // res.send("File handle");
//     // next()
// }])


app.use('/client', (req,res, next) =>{
    console.log("Hello");
    next();
    // res.send("Hello testing the route")
})

app.get("/client", (req,res,next) =>{
    res.send("<i><b>Hello i am here </b></i>")
})

app.listen(port, () =>{
    console.log("Listening o port ", port)
});



