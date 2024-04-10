import axios from 'axios'
import * as cheerio from 'cheerio'
import prettier from 'prettier'
import readJSON from './readJSON.js'
import getDomainFromURL from './getDomainFromURL.js'

export async function scrapeWebsite(url) {
  const { data: html } = await axios.get(url)
  const $ = cheerio.load(html)

  const { 
    ingredient_include, 
    instruction_include, 
  } = getDomainElements(url)

  const ingredients = $(ingredient_include).map((_, ingredient) => {
    let raw = $(ingredient).text()
    return raw.trim()
      .replace(/\s+/g, ' ')
      .replace(/▢ /g, '')
  }
  ).get()
  console.log(ingredients)

  const instructions = $(instruction_include).map((_, instruction) => {
    let raw = $(instruction).text()
    return raw.trim()
  }
  ).get()
  console.log(instructions)

  return { ingredients: ingredients, instructions: instructions }
}

async function prettyPrintHTML(html) { // for dev and debug purposes
  const formattedHtml = await prettier.format(html, { parser: 'html' })
  console.log(formattedHtml)
}

function getDomainElements(url) {
  const elements = readJSON('elements.json')
  const domain = getDomainFromURL(url)
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].domain === domain) {
      return {
        ingredient_include: elements[i].ingredient_include, 
        instruction_include: elements[i].instruction_include,
      }
    }
  }
  return null
}