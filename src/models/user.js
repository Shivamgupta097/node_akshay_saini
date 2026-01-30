const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:5,
        maxLength:50
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    age:{
        type:Number,
        min:18
    },
    about:{
        type:String,
        default:"This is a default about of the user"
    },
    photoUrl:{
        type:String,
        default:"https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?semt=ais_hybrid&w=740&q=80"
    },
    skills:{
        type:[String],
    },
    gender: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
}, {
    timestamps :true
})

const User = mongoose.model("User" , userSchema);

module.exports = User
