import { scrapeWebsite } from "../utils/scraper.js"
import { config } from 'dotenv'
config({ path: '../../.env'})

console.log(process.env)

await scrapeWebsite('https://www.thewholesomedish.com/the-best-classic-burger/')
// await scrapeWebsite('https://www.food.com/recipe/the-perfect-burger-92021')
// await scrapeWebsite('https://cookingwithkarli.com/crumbl-cookies-copy-cat-recipe/')