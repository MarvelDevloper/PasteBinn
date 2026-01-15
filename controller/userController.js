const { asyncHandler, ApiError } = require("../middleware/ErrorHander")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../model/userModel")
const sendEmail = require("../nodemailer/sendMail")
const { accessToken, refreshToken } = require("../Auth/generateToken")

const userController = {
    signup: asyncHandler(async (req, res) => {
        const { email, name, password, nickname, role } = req.body

        if (!email || !name || !password || !nickname) {
            throw new ApiError('all fields required', 400)
        }

        const existUser = await User.findOne({ email: email })
        if (existUser) {
            throw new ApiError('account already exist', 400)
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name, email, password: hashPassword, nickname, role: role || 'user'
        })

        await user.save()


        try {
            await sendEmail(
                email,
                'Signup successful. Thanks for choosing us. Have a great day!',
                'Signup successfully done',
                process.env.APPINFO
            );
        } catch (err) {
            console.log("Email send failed:", err.message);
        }

        return res.status(201).json({ msg: 'account created successfully!' })
    }),
    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) {
            throw new ApiError('required all fields', 400)
        }

        const existUser = await User.findOne({ email: email })

        if (!existUser) {
            throw new ApiError('invalid password or email', 400)
        }

        const isValid = await bcrypt.compare(password, existUser.password)

        if (!isValid) {
            throw new ApiError('invalid password or email', 400)
        }

        const accesstoken = accessToken({ id: existUser._id, email: existUser.email, role: existUser.role })
        const refreshtoken = refreshToken({ id: existUser._id, email: existUser.email, role: existUser.role })

        res.cookie("refreshtoken", refreshtoken, {
            httpOnly: true,
            secure: false,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({ msg: 'login successful!', token: accesstoken, refreshtoken })
    }),
    profile: asyncHandler(async (req, res) => {
        const userId = req.userid

        if (!userId) {
            throw new ApiError('userId not found!')
        }

        const existUserProfile = await User.findById(userId)

        if (!existUserProfile) {
            throw new ApiError('user data not found', 400)
        }

        return res.status(200).json({ msg: existUserProfile })
    }),
    changePassword: asyncHandler(async (req, res) => {
        const { oldpassword, newpassword } = req.body

        const userId = req.userid
        if (!oldpassword || !newpassword) {
            throw new ApiError('all fields error', 400)
        }

        const existUser = await User.findById(userId)

        if (!existUser) {
            throw new ApiError("account not exist", 400)
        }

        const isValid = await bcrypt.compare(oldpassword, existUser.password)

        if (!isValid) {
            throw new ApiError('invalid password')
        }
        const newHashPassword = await bcrypt.hash(newpassword, 10)
        existUser.password = newHashPassword
        existUser.save()
        return res.status(200).json({ msg: 'password save' })
    }),
}

module.exports = userController