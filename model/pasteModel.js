const mongoose=require('mongoose')
const pasteSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    text:{
        type:String,
        trim:true,
        required:true,
    },
    status:{
        type:String,
        enum:['public','private'],
        default:'public'
    },
    uniqueId:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        expires:0
    }
},{
    timestamps:true
})

const Paste=mongoose.model('Paste',pasteSchema)

module.exports=Paste