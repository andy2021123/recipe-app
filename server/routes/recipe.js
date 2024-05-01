import express from 'express'
import { addRecipe, deleteRecipe, getCategoryRecipes, getLatestRecipes, getRecipe, getRecipes } from '../database/recipe.js'
import fs from 'node:fs'
import multer from 'multer'
import { scrapeWebsite } from '../utils/scraper.js'
const upload = multer({ dest: 'images/' })

const router = express.Router()

// routes
router.get('/list', async (req, res) => {
  const { count } = req.query

  if (parseInt(count)) {
    const recipes = await getLatestRecipes(count)
    res.send(recipes)
  } else {
    const recipes = await getRecipes()
    res.send(recipes)
  }
})

router.get('/list/:category', async (req, res) => {
  const { category } = req.params

  const recipes = await getCategoryRecipes(category)
  res.send(recipes)
})

router.get('/autofill', async (req, res) => {
  const { url } = req.query
  const recipe = await scrapeWebsite(url)
  
  res.send(recipe)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const recipe = await getRecipe(id)
  res.send(recipe)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  if (fs.existsSync(`images/${id}.png`)) {
    fs.unlinkSync(`images/${id}.png`)
  }
  await deleteRecipe(id)
  
  res.sendStatus(202)
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

router.get('/:id/image', async (req, res) => {
  const { id } = req.params

  if (fs.existsSync(`images/${id}.png`)) {
    res.sendFile(`${id}.png`, { root: './images' })
  } else {
    res.sendStatus(204)
  }
})

router.post('/:id/image', upload.single('file'), async (req, res) => { // maybe should also use params instead of query
  const { id } = req.params
  const { filename } = req.file
  fs.rename(`images/${filename}`, `images/${id}.png`, (err) => {
    if (err) {
      console.log(err)
    }
  })
  res.sendStatus(200)
})

export default router
