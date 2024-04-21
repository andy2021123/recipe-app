import pool from "./index.js"
import format from 'pg-format'

export async function getSelectors(domain) {
  const { rows } = await pool.query(`
    SELECT * FROM selectors
    WHERE domain = $1
  `, [domain]);
  return rows[0] || { name: null, ingredients: null, instructions: null }
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