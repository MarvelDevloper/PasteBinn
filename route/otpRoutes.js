const express=require('express')
const { verifyOtp, sendOtp } = require('../controller/otpController')
const verifyToken = require('../middleware/verifyToken')
const otpRoute=express.Router()
const apiRateLimit=require('../middleware/apiRatelimit')

otpRoute.get('/get-otp',apiRateLimit(15*60*1000,1,"you reached to request limit pls try again after 15 minutes"),verifyToken,sendOtp)
otpRoute.post('/verify-otp',verifyToken,verifyOtp)

module.exports=otpRoute