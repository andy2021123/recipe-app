import express from 'express'
// import { getUsers } from '../database/example.js'
import recipe from './recipe.js'

const router = express.Router()

// routes
router.get('/hello', async (req, res) => {
  res.send({message: 'hello world!'})
})

// router.get('/users', async (req, res) => { // demonstrate database usage
//   const users = await getUsers()
//   console.log(users)
//   res.send(users)
// })

router.use('/recipe', recipe) // can split into separate files for organization

export default router