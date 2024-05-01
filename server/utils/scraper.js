import axios from 'axios'
import * as cheerio from 'cheerio'
import getDomainFromURL from './getDomainFromURL.js'
import { getSelectors } from '../database/selectors.js'

export async function runScraper(url, { name, description, ingredients, instructions, prep_time, cook_time }) {
  const response = await getHTML(url)

  if (response) {
    const { data: html } = response
    const $ = cheerio.load(html)

    const $name = $(name).text().trim() || null

    const $description = $(description).text().trim() || null

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
        .replace(/\s+/g, ' ')
    }
    ).get()

    const $prep_time = $(prep_time).text().trim()
      .replace(/minutes/g, '')

    const $cook_time = $(cook_time).text().trim()
      .replace(/minutes/g, '')

    return { 
      name: $name, 
      description: $description, 
      ingredients: $ingredients, 
      instructions: $instructions, 
      prep_time: parseInt($prep_time) || null,
      cook_time: parseInt($cook_time) || null,
    }
  } else {
    return {
      name: null, 
      description: null, 
      ingredients: [], 
      instructions: [], 
      prep_time: null,
      cook_time: null,
    }
  }

}

export async function scrapeWebsite(url) {
  const domain = getDomainFromURL(url)

  if (domain) {
    const selectors = await getSelectors(domain)
    return await runScraper(url, selectors)
  } else {
    return {
      name: null, 
      description: null, 
      ingredients: [], 
      instructions: [], 
      prep_time: null,
      cook_time: null,
    }
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