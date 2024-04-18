import express from 'express'
import { addRecipe, getRecipes } from '../database/recipe.js'
import { loadImage, saveImage } from '../utils/image.js'
import fs from 'node:fs'
import multer from 'multer'
const upload = multer({ dest: 'images/' })

const router = express.Router()

// routes
router.get('/list', async (req, res) => {
  // get specific data of all recipes from database (make sure to treat the name_url as the id)
  const recipes = await getRecipes()

  for (const recipe of recipes) {
    recipe.image = await loadImage(recipe.id)
  }
  res.send(recipes)
})

router.get('/list/:category', async (req, res) => {
  // get specific data of all recipes of a specific category (make sure to treat the name_url as the id)

  // gather all images (will be its on util)
  res.sendStatus(200)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params 
  // get one recipe from name_url (id) and get in its entirety
  res.sendStatus(200)
})

router.get('/image', async (req, res) => {
  const { id } = req.query 
  // get one recipe from name_url (id) and get in its entirety
  res.sendStatus(200)
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
  console.log(recipe)
  try {
    const id = await addRecipe(recipe)
    res.send(id)
  } catch {
    res.sendStatus(500)
  }
})

router.post('/image', upload.single('file'), async (req, res) => {
  const { id } = req.query 
  const { filename } = req.file
  fs.rename(`images/${filename}`, `images/${id}.png`, (err) => console.log(err))
  res.sendStatus(200)
})

export default router
