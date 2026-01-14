const jwt=require('jsonwebtoken')
require('dotenv').config()
const verifyToken=(req,res,next)=>{
    const token=req.headers.authorization.split(' ')[1]

    if(!token){
        return res.status(400).json({msg:'token not found!'})
    }

    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err){
            console.log(err)
        }
        req.userid=user.id
        req.role=user.role
        req.email=user.email
        next()
    })
}

module.exports=verifyToken