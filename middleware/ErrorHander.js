class ApiError extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode=statusCode
        this.name="ApiError"
    }
}

const asyncHandler=(fn)=>(req,res,next)=>{
    return Promise.resolve(fn(req,res,next)).catch(next)
}


const globalErrorHandler=(err,req,res,next)=>{
    err.message=err.message || 'internal server error'
    err.statusCode=err.statusCode || 500

    if(err instanceof ApiError){
        return res.status(err.statusCode).json({Error:err.message})
    }else{
        return res.status(500).json({Error:'internal server error'})
    }
}

module.exports={ApiError,asyncHandler,globalErrorHandler}