const User=require('../models/userModel')
const userValidationSchema={
    email:{
        notEmpty:{
            errorMessage:'email should not be empty'
        },
        isEmail:{
            errorMessage:'email should be in a valid format'
        },
        trim:true,
        normalizeEmail:true
    }
}
module.exports=userValidationSchema