const jwt=require('jsonwebtoken')
const generateToken = {
    accessToken: (userData) => {
        const accessToken = jwt.sign({userData}, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' })

        return accessToken
    },
    refreshToken: (userData) => {
        const refreshToken = jwt.sign({userData}, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' })

        return refreshToken
    }
}

module.exports=generateToken