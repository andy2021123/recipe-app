import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'node:fs'
import { getRecipeMeta } from './database/recipe.js'

const dist = process.env.DIST || '../client/dist'
const router = express.Router()

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

router.get('/', (req, res) => {
  const filePath = path.resolve(__dirname, dist, 'index.html')
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err)
    } else {
      data = data
      .replace(/__TITLE__/g, "Twizz Stew")
      .replace(/__DESCRIPTION__/g, "Twizz Stew is a recipe app without ads!")
      .replace(/__IMAGE__/g, "http://twizzstew.lan/api/image")

      res.send(data)
    }
  })
})

router.use(express.static(path.resolve(__dirname, dist)))

router.get('/recipe/:id', async (req, res) => {
  const { id } = req.params
  const domain = `${req.protocol}://${req.get('host')}`

  // get metadata about recipe from database
  const { name, description } = await getRecipeMeta(id)

  const filePath = path.resolve(__dirname, dist, 'index.html')
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err)
    } else {
      data = data
        .replace(/__TITLE__/g, name)
        .replace(/__DESCRIPTION__/g, description)
        .replace(/__IMAGE__/g, `http://twizzstew.lan/api/recipe/${id}/image`)

      res.send(data)
    }
  })
})

router.get('/*', (req, res) => {
  const domain = `${req.protocol}://${req.get('host')}`
  const filePath = path.resolve(__dirname, dist, 'index.html')
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err)
    } else {
      data = data
        .replace(/__TITLE__/g, "Twizz Stew")
        .replace(/__DESCRIPTION__/g, "Twizz Stew is a recipe app without ads!")
        .replace(/__IMAGE__/g, "http://twizzstew.lan/api/image")

      res.send(data)
    }
  })
})

export default router
