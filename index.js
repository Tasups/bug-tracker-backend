const express = require('express')
const app = express();
const issues = require('./routes/issues')
const connectDB = require('.db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


// EXPRESS TOOLS
// so I'm supposed to use a static webpage here, however, I'd like to use a React SPA--may need to figure out how to do this
app.use(express.json())

// MIDDLEWARE
app.use(notFound)
app.use(errorHandlerMiddleware)

// ROUTES
app.use('/api/v1/issues', issues)

const port = process.env.PORT || 5000

const start = () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
  })
  } catch (error) {
    console.log(error)
  }
}

start()