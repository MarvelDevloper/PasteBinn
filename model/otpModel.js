const mongoose=require('mongoose')

const otpSchema=mongoose.Schema({
    otp:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    expiresAt:{
        type:Date,
        expires:0
    }
},{
    timestamps:true
})

const OTP=mongoose.model("OTP",otpSchema)

module.exports=OTP