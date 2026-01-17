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

app.get('/user', (req, res) => {
 res.send({
    "name" :"Shivam",
    age:"28"
 })
})

app.post('/user' , (req,res) =>{
  res.send("Data successfully saved to the database!")
})

app.patch('/user' , (req,res) =>{
  res.send("Data successfully small update w.r.t user to the database!")
})

app.post("user", (req,res) =>{
    res.send("Data successfully fully update w.r.t to user id")
})
app.listen(port, () =>{
    console.log("Listening o port ", port)
});



