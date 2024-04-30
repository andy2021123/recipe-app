import express from 'express'
import { runScraper, scrapeWebsite } from '../utils/scraper.js'
import { addSelectors } from '../database/selectors.js'

const router = express.Router()

// routes
router.post('/test', async (req, res) => {
  const { body: selectors } = req
  const recipe = await runScraper(selectors.url, selectors)

  res.send(recipe)
})

router.post('/', async (req, res) => {
  const { body: selectors } = req
  
  try {
    await addSelectors(selectors)
    res.sendStatus(201)
  } catch {
    res.sendStatus(204)
  }
})

export default router
