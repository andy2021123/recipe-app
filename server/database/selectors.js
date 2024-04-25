import pool from "./index.js"
import format from 'pg-format'

const default_selectors = { 
  name: '.wprm-recipe-name', 
  description: '.wprm-recipe-summary', 
  ingredients: '.wprm-recipe-ingredient', 
  instructions: '.wprm-recipe-instruction-text',
  cook_time: '.wprm-recipe-cook_time-minutes',
  prep_time: '.wprm-recipe-prep_time-minutes',
}

export async function getSelectors(domain) {
  const { rows } = await pool.query(`
    SELECT * FROM selectors
    WHERE domain = $1
  `, [domain]);
    return rows[0] || default_selectors
}

export async function addSelectors({ domain, name, description, ingredients, instructions, notes, image }) {
  const details = [domain, name, description || null, ingredients, instructions, notes || null, image]
  await pool.query(format(`
  INSERT INTO recipes (
    domain, name, description, ingredients, instructions, notes, image
  ) VALUES (
    %L
  )
`, details));
}