const otpGenerator = require('otp-generator')
const sendEmail = require('../nodemailer/sendMail')
const OTP = require('../model/otpModel')

exports.sendOtp = async (req, res) => {
    try {
        const email=req.email

        if (!email) {
            return res.status(400).json({ msg: 'email required!' })
        }

        const generated_otp = generateOtp()
        console.log(generated_otp)

        const expiresAt = new Date(Date.now() + 2 * 60 * 1000)
        const otp = new OTP({
            email,
            otp: generated_otp,
            expiresAt
        })
        await otp.save()

        await sendEmail(email, 'Registration OTP', generated_otp)
        return res.status(200).json({ msg: 'otp send to you register mail account !' })

    } catch (error) {
        console.log(error)
    }
}

exports.verifyOtp=async(req,res)=>{
    try {
        const {otp} =req.body
        const email=req.email

        if(!otp || !email){
            return res.status(400).json({msg:'all fields required!'})
        }

        const getOtp= await OTP.findOne({email:email})

        if(!getOtp){
            return res.status(404).json({msg:'otp Expires pls try again!'})
        }

        const isValid=getOtp.otp===otp

        if(!isValid){
            return res.status(401).json({msg:'otp is not valid'})
        }

        await OTP.findOneAndDelete({email:email})
        return res.status(200).json({msg:'otp verified'})
    } catch (error) {
        console.log(error)
    }
}

generateOtp = () => {
    return otpGenerator.generate(6, { upperCaseAlphabets: true, specialChars: false });
}
