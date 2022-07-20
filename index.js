const express = require('express')
const app = express();
const projects = require('./routes/projects')
const tickets = require('./routes/tickets')
const connectDB = require('./db/connect')
require('dotenv').config()
// this was causing constant errors on postman   const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


// EXPRESS TOOLS
// so I'm supposed to use a static webpage here, however, I'd like to use a React SPA--may need to figure out how to do this
app.use(express.json())

// MIDDLEWARE
// this was causing constant errors on postman   app.use(notFound)
app.use(errorHandlerMiddleware)

// ROUTES
app.use('/api/v1/projects', projects)
<<<<<<< HEAD
app.use('/api/v1/projects', tickets)
=======
app.use('/api/v1/tickets', tickets);
>>>>>>> db9845e9a1d0ae622badf2490fb93e4e141d4f22

const port = process.env.PORT || 5000

const start = async() => {
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