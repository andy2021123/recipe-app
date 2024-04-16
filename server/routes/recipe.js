import express from 'express'
import { addRecipe, getRecipes } from '../database/recipe.js'
import { loadImage } from '../utils/image.js'

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

})

router.get('/:id', async (req, res) => {
  const { id } = req.params 
  // get one recipe from name_url (id) and get in its entirety
})

router.post('/url', async (req, res) => {
  // pass the url to the web scraper utility

  // if data was returned, send it to front end

  // if not, send a different response number so front end can give a flash message or something
  res.send()
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

export default router
