const { default: mongoose } = require("mongoose")
require('dotenv').config()

const DBconnection = () => {
    mongoose.connect(process.env.DB_URL).then(()=>console.log("DB connected")).catch(() => { console.log('DB connection failed') })
}

module.exports = DBconnection