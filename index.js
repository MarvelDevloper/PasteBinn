const express=require('express')
const DBconnection = require('./dbConnection/DBconnection')
const { globalErrorHandler } = require('./middleware/ErrorHander')
const app=express()
const cors = require('cors');
require('dotenv').config()
const apiratelimit=require('./middleware/apiRatelimit')
const userRoute = require('./route/userRoute')
const pasteRoute = require('./route/pasteRoute')
const otpRoute = require('./route/otpRoutes')
// const corsConfig=require('./config/configCors')
// DB connection 
DBconnection()

app.set('trust proxy', 1); 
app.use(cors({
  origin: ["http://localhost:5173", "https://yourfrontend.onrender.com"],
  credentials: true
}));
// app.use(corsConfig)
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