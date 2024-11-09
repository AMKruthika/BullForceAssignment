const {Schema,model}=require('mongoose')
const userSchema=new Schema({
    email:String,
    otp:String,
    otpExpiry:Date
},{timestamps:true})
const User=model('User',userSchema)
module.exports=User