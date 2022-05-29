const express = require('express')
const app = express();
// NEED TO IMPLEMENT WITH .env file const connectDB = require('.db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')




// EXPRESS TOOLS
app.use(express.json())

// MIDDLEWARE
app.use(notFound)
app.use(errorHandlerMiddleware)

// ROUTES
app.use('/api/v1/issues', issues)

const port = process.env.PORT || 5000

const start = () => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
  })
}

start()