import express from 'express'
import cookieparser from 'cookie-parser'
import helmet from 'helmet'
import router from './routes/index.js'
import client from './client.js'
import './scheduledJobs.js'

// create app instance
const app = express()

// middleware 
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "blob:"]
      }
    }
  })
)
app.use(cookieparser())
app.use(express.json()) 

// basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({message: 'Internal Error!'})
})

app.use('/api', router) // api routes
app.use('/', client) // client routes

// start the app on designated port
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})