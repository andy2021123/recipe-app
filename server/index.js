import express from 'express'
import morgan from 'morgan'
import cookieparser from 'cookie-parser'
import helmet from 'helmet'
import router from './routes/index.js'
import './scheduledJobs.js'

// create app instance
const app = express()

// middleware 
app.use(helmet()) // provides useful security headers
app.use(cookieparser())
app.use(express.json()) 
app.use(morgan('dev', {
  skip: (req, res) => req.route.path === '/:id/image' // skips logging image requests
})) // console logs request information

// basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({message: 'Internal Error!'})
})

// routes
app.use('/api', router)

// start the app on designated port
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})