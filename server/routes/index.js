import express from 'express'
import morgan from 'morgan'
import recipe from './recipe.js'
import fs from 'node:fs'

const router = express.Router()

// api only middleware
router.use(morgan('dev', {
  skip: (req, res) => req.route.path === '/:id/image' 
})) // console logs request information

// routes
router.get('/hello', async (req, res) => {
  res.send({message: 'hello world!'})
})

router.get('/image', async (req, res) => {
  if (fs.existsSync('images/AppImage.png')) {
    res.sendFile('AppImage.png', { root: './images' })
  } else {
    res.sendStatus(204)
  }
})

router.use('/recipe', recipe) // can split into separate files for organization

router.get('/*', async (req, res) => {
  res.sendStatus(404)
})

export default router