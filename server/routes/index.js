import express from 'express'
import recipe from './recipe.js'

const router = express.Router()

// routes
router.get('/hello', async (req, res) => {
  res.send({message: 'hello world!'})
})

router.use('/recipe', recipe) // can split into separate files for organization

export default router