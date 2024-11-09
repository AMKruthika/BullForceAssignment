const User=require('../models/userModel')
const nodemailer=require('nodemailer')
const {validationResult}=require('express-validator')
const userCtrlr={}
function generateNumericOTP(length = 4) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
}
userCtrlr.otpGenerate=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const body=req.body
        const email=body.email
        let data=await User.findOne({email})
        if(data){
            if (data.otpExpiry > Date.now()) {
                return res.status(400).json({ error: 'An OTP is already active for this email.' });
            }
            else{
                await User.deleteOne({ email })
            }
        }
        const otp=generateNumericOTP()
        const otpExpiry=Date.now()+5*60*1000
        const user=new User({email,otp,otpExpiry})
        await user.save()
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.Email,
                pass:process.env.Password
            }
        });
        const mailOptions={
            from:process.env.Email,
            to:email,
            subject:'OTP to login',
            text: `your OTP to login is ${otp}`
        }
        await transporter.sendMail(mailOptions)
        res.status(201).json(user)
        
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
      
    }
}
module.exports=userCtrlr