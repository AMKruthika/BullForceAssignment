const User=require('../models/userModel')
const otpValidateCtrlr={}
otpValidateCtrlr.validate=async(req,res)=>{
    const body=req.body
    const otp=body.otp
    try{
        const data=await User.findOne({otp})
        if(!data){
            return res.status(400).json({error:'Invalid OTP'})
        }
        if(data.otpExpiry<Date.now()){
            await User.deleteOne(
                {otp}
            );
            return res.status(400).json({error:'OTP has expired'})
        }
        await User.deleteOne(
            {otp}
        );

        res.status(200).json({ message: 'OTP validated successfully' });
    }catch(err){
        console.log(err.message)
        res.status(500).json({error:'Internal Server Error'})
    }
}
module.exports=otpValidateCtrlr