const validator = require("validator")

const validateSignUpData = (req) =>{
    const {firstName , lastName, email, password} = req.body;

    if(!firstName || !lastName){
        throw new Error('firstName is required!')

    }else if(!validator.isEmail(email)){
        throw new Error("Plese enter a valid email!")

    }else if(!validator.isStrongPassword(password)){
        throw new Error('Enter password must be strong')
    }
}

const validEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "email", "photoUrl", "gender" , "age", "about", "skills"];
    const isAllowedToEditFields = Object.keys(req.body).every(cur => allowedEditFields.includes(cur));
    console.log("is", isAllowedToEditFields)
    return isAllowedToEditFields
}

module.exports = {validateSignUpData, validEditProfileData}