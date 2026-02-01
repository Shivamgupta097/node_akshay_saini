const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

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
        trim:true,
        validate:function(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
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
        default:"https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?semt=ais_hybrid&w=740&q=80",
        validate:function(value){
            if(!validator.isURL(value)){
                throw new Error('Photo url is not vailid')
            }
        }
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
        required:true,
        validate: function(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password must be strong")
            }
        }
    }
}, {
    timestamps :true
})

userSchema.methods.getJWT = async function(){
    const userDetails = this;

     const token = await jwt.sign({ _id: userDetails._id }, "DevTinder$7999", {
        expiresIn:"7d"
    })

    return token
}

userSchema.methods.validatePassword = async function (req){
    const user = this;
    // const userData = await User.findOne({emailId:this.emailId})
      const isPasswordValid = bcrypt.compare(req.password , this.password)
      return isPasswordValid
}

const User = mongoose.model("User" , userSchema);

module.exports = User
