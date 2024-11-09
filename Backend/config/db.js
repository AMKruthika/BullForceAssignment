const mongoose=require('mongoose')
const configDB=async()=>{
    try{
        const db=await mongoose.connect('mongodb://127.0.0.1:27017/Bull-Force')
        console.log('This App is connected to db')
    }catch(err)
    {
        console.log(err)
    }
}
module.exports=configDB