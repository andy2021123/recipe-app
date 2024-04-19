import express from 'express'
import { addRecipe, getRecipe, getRecipes } from '../database/recipe.js'
// import { loadImage, saveImage } from '../utils/image.js'
import fs from 'node:fs'
import multer from 'multer'
const upload = multer({ dest: 'images/' })

const router = express.Router()

// routes
router.get('/list', async (req, res) => {
  // get specific data of all recipes from database (make sure to treat the name_url as the id)
  const recipes = await getRecipes()
  res.send(recipes)
})

router.get('/list/:category', async (req, res) => {
  // get specific data of all recipes of a specific category (make sure to treat the name_url as the id)

  // gather all images (will be its on util)
  res.sendStatus(200)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const recipe = await getRecipe(id)
  res.send(recipe)
})

router.post('/url', async (req, res) => {
  // pass the url to the web scraper utility

  // if data was returned, send it to front end

  // if not, send a different response number so front end can give a flash message or something
  res.sendStatus(200)
})

// adds recipe to database and returns the name_url (id) of the recipe
router.post('/', async (req, res) => {
  const { body: recipe } = req
  try {
    const id = await addRecipe(recipe)
    res.send(id)
  } catch {
    res.sendStatus(500)
  }
})

router.get('/image/:id', async (req, res) => {
  const { id } = req.params

  if (fs.existsSync(`images/${id}.png`)) {
    res.sendFile(`${id}.png`, { root: './images' })
  } else {
    res.sendStatus(204)
  }
})

router.post('/image', upload.single('file'), async (req, res) => { // maybe should also use params instead of query
  const { id } = req.query
  const { filename } = req.file
  fs.rename(`images/${filename}`, `images/${id}.png`, (err) => console.log(err))
  res.sendStatus(200)
})

export default router
