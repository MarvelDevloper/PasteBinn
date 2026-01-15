const express = require('express')
const userController = require('../controller/userController')
const { verifyAccessToken, verifyRefreshToken } = require('../Auth/verifyToken')
const userRoute = express.Router()

userRoute.post('/signup', userController.signup)
userRoute.post('/login', userController.login)
userRoute.get('/profile', verifyAccessToken, userController.profile)
userRoute.post('/change-password', verifyAccessToken, userController.changePassword)
userRoute.get('/refresh-token',verifyRefreshToken)
module.exports = userRoute