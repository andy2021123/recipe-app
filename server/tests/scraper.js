import { scrapeWebsite } from "../utils/scraper.js"
import * as cheerio from 'cheerio'



// await scrapeWebsite('https://www.thewholesomedish.com/the-best-classic-burger/')
// await scrapeWebsite('https://www.food.com/recipe/the-perfect-burger-92021')
// await scrapeWebsite('https://cookingwithkarli.com/crumbl-cookies-copy-cat-recipe/')


  const $ = cheerio.load(`
    <ol class="css-yzf9pi e1k3dme10" >
      <li>
        <span aria-hidden="true" class="css-0 eagam8p0"></span>
        <span class="css-0 e1ma2h5t1">Step </span>
        <span class="css-0 e1ma2h5t0">1</span>
        <style data-emotion="css 13o7eu2">
            .css-13o7eu2 {
                display: block;
            }
        </style>
        <span aria-hidden="true" class="css-13o7eu2 eagam8p1"></span>
        In a large skillet over medium heat, melt butter. Add shallot and garlic and cook, stirring frequently, until softened, 4 to 5 minutes.
      </li>
      <li>
          <span aria-hidden="true" class="css-0 eagam8p0"></span>
          <span class="css-0 e1ma2h5t1">Step </span>
          <span class="css-0 e1ma2h5t0">2</span>
          <span aria-hidden="true" class="css-13o7eu2 eagam8p1"></span>
          Add tomato paste and red pepper flakes and cook, stirring frequently, until paste has coated shallots and garlic and is beginning to darken, 5 minutes. 
      </li>
      <li>
          <span aria-hidden="true" class="css-0 eagam8p0"></span>
          <span class="css-0 e1ma2h5t1">Step </span>
          <span class="css-0 e1ma2h5t0">3</span>
          <span aria-hidden="true" class="css-13o7eu2 eagam8p1"></span>
          Add vodka to pot and stir to incorporate, scraping up any browned bits from the bottom of the pot. Turn off heat.
      </li>
      <li>
          <span aria-hidden="true" class="css-0 eagam8p0"></span>
          <span class="css-0 e1ma2h5t1">Step </span>
          <span class="css-0 e1ma2h5t0">4</span>
          <span aria-hidden="true" class="css-13o7eu2 eagam8p1"></span>
          Bring a large pot of salted water to a boil and cook pasta until al dente. Reserve 2 cups of pasta water before draining.
      </li>
      <li>
          <span aria-hidden="true" class="css-0 eagam8p0"></span>
          <span class="css-0 e1ma2h5t1">Step </span>
          <span class="css-0 e1ma2h5t0">5</span>
          <span aria-hidden="true" class="css-13o7eu2 eagam8p1"></span>
          Return sauce to medium heat and add 1/4 cup of pasta water and heavy cream, stirring to combine. Add half the Parmesan and stir until melted. Turn off heat and stir in cooked pasta. Fold in remaining Parmesan, adding more pasta water (about a tablespoon at a time) if the sauce is looking dry. Season with salt if needed. Serve topped with more Parmesan and torn basil leaves.
      </li>
    </ol >
  `)

  const $instructions = $('.css-yzf9pi > li').map((_, instruction) => {
    let raw = $(instruction).contents().last().text()
    return raw.trim()
      .replace(/\s+/g, ' ')
      
  }
  ).get()

  console.log($instructions)

  