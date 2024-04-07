import axios from 'axios'
import * as cheerio from 'cheerio'
import prettier from 'prettier'
import readJSON from './readJSON.js'
import getDomainFromURL from './getDomainFromURL.js'

export async function scrapeWebsite(url) {
  const { data: html } = await axios.get(url)
  const $ = cheerio.load(html)

  const { ingredientElement, instructionElement } = getDomainElements(url)

  const ingredients = $(ingredientElement).map((_, ingredient) => {
    const raw = $(ingredient).text()
    return raw.trim().replace(/\s+/g, ' ')
  }
  ).get()
  console.log(ingredients)

  const instructions = $(instructionElement).map((index, instruction) => ({
    index: index + 1,
    text: $(instruction).text()
  }
  )).get()
  console.log(instructions)
}

async function prettyPrintHTML(html) {
  const formattedHtml = await prettier.format(html, { parser: 'html' })
  console.log(formattedHtml)
}

function getDomainElements(url) {
  const elements = readJSON('elements.json')
  const domain = getDomainFromURL(url)
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].domain === domain) {
      return {
        ingredientElement: elements[i].ingredient_element,
        instructionElement: elements[i].instruction_element
      };
    }
  }
  return null

// TODO: add exception elements as well (there is probably a way to query specific elements and then remove elements that fit other parameters)
}