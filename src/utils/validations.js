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

module.exports = {validateSignUpData}