const ratelimit = require('express-rate-limit')

const apiRateLimit = (time, limit,message) => {
    return ratelimit({
        windowMs:time, 
        limit: limit, 
        standardHeaders: 'draft-8', 
        message:message,
        legacyHeaders: false, 
    })
}

module.exports=apiRateLimit