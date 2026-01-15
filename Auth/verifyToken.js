const jwt = require('jsonwebtoken')
const { accessToken } = require('./generateToken')


const verifyToken = {

    verifyAccessToken: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]

            if (!token) {
                return res.status(400).json({ msg: 'token not found!' })
            }

            jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
                if (err) {
                    console.log(err)
                    return res.status(401).json({ error: "access token is expired" })
                }
                req.userid = user.userData.id
                req.role = user.userData.role
                req.email = user.userData.email
                next()
            })
        } catch (error) {
            // console.log(ApiError)
            return res.status(400).json({ msg: "access token expired" })
        }
    },

    verifyRefreshToken: (req, res) => {
        try {
            const token = req.cookies?.refreshtoken ||
                req.headers.authorization.split(" ")[1];

            if (!token) {
                return res.status(401).json({ msg: 'token not found or unauthorzed error!' })
            }

            jwt.verify(token, process.env.REFRESH_SECRET_KEY, (err, user) => {
                if (err) {
                    return res.status(401).json({ error: "token is expired" })
                }
                const accessTok = accessToken(user.userData)
                return res.status(200).json({ accessToken: accessTok })
            })
        }
        catch (error) {
            // console.log(error)
            return res.status(401).json({ error: "token is expired" })
        }
    }
}

module.exports = verifyToken