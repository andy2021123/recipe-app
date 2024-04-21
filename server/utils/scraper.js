import axios from 'axios'
import * as cheerio from 'cheerio'
import getDomainFromURL from './getDomainFromURL.js'
import { getSelectors } from '../database/selectors.js'

export async function scrapeWebsite(url) {
  const response = await getHTML(url)

  if (response) {
    const { data: html } = response
    const $ = cheerio.load(html)

    const domain = getDomainFromURL(url)
    const {
      name, ingredients, instructions
    } = await getSelectors(domain)

    const $name = $(name).text().trim() || null

    const $ingredients = $(ingredients).map((_, ingredient) => {
      let raw = $(ingredient).text()
      return raw.trim()
        .replace(/\s+/g, ' ')
        .replace(/▢ /g, '')
    }
    ).get()

    const $instructions = $(instructions).map((_, instruction) => {
      let raw = $(instruction).text()
      return raw.trim()
    }
    ).get()

    return { name: $name, ingredients: $ingredients, instructions: $instructions }
  } else {
    return { name: null, ingredients: [], instructions: [] }
  }

}

function wait(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('timeout succeeded')), ms);
  });
}


async function getHTML(url) {
  try {
    return await Promise.race([wait(3000), axios.get(url)])
  } catch (err) {
    return null
  }

}