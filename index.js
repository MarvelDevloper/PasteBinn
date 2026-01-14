const express=require('express')
const DBconnection = require('./dbConnection/DBconnection')
const { globalErrorHandler } = require('./middleware/ErrorHander')
const app=express()
require('dotenv').config()
const apiratelimit=require('./middleware/apiRatelimit')
const userRoute = require('./route/userRoute')
const pasteRoute = require('./route/pasteRoute')
const otpRoute = require('./route/otpRoutes')
// DB connection 
DBconnection()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(apiratelimit(15*60*1000,100))


app.use('/user',userRoute)
app.use('/user',pasteRoute)
app.use('/otp',otpRoute)

app.use(globalErrorHandler)

const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log("Server Started")
})