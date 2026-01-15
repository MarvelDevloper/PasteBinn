const express=require('express')
const { verifyOtp, sendOtp } = require('../controller/otpController')
const otpRoute=express.Router()
const apiRateLimit=require('../middleware/apiRatelimit')
const { verifyAccessToken } = require('../Auth/verifyToken')

otpRoute.get('/get-otp',apiRateLimit(15*60*1000,1,"you reached to request limit pls try again after 15 minutes"),verifyAccessToken,sendOtp)
otpRoute.post('/verify-otp',verifyAccessToken,verifyOtp)

module.exports=otpRoute