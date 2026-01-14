const cors = require('cors')

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://yourfrontend.com'
    ]

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('CORS not allowed'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}

module.exports = cors(corsOptions)
