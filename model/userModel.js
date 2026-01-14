const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    nickname: {
        type: String,
        required: true,
        trim: true,
    },
    role:{
        type:String,
        trim:true,
        enum:['user','admin'],
        default:'user'
    }
},
{
    timestamps:true
})

const User=mongoose.model('User',userSchema)


module.exports=User