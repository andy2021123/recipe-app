import express from 'express'
import { runScraper, scrapeWebsite } from '../utils/scraper.js'

const router = express.Router()

// routes
router.post('/test', async (req, res) => {
  const { body: selectors } = req
  const recipe = await runScraper(selectors.url, selectors)

  res.send(recipe)
})

export default router
