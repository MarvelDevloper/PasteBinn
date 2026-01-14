const express=require('express')
const verifyToken = require('../middleware/verifyToken')
const userController = require('../controller/userController')
const userRoute=express.Router()

userRoute.post('/signup',userController.signup)
userRoute.post('/login',userController.login)
userRoute.get('/profile',verifyToken,userController.profile)
userRoute.post('/change-password',verifyToken,userController.changePassword)

module.exports=userRoute