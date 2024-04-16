import pool from "./index.js"
import generateNameUrl from '../utils/generateNameUrl.js'
import { saveImage } from "../utils/image.js";

export async function getRecipes() {
  const { rows } = await pool.query(`
    SELECT name_url AS id, name, category, description
    FROM recipes
  `);
  return rows
}

async function getRecipeNames() {
  const { rows } = await pool.query(`
    SELECT name FROM recipes
  `);
  return rows
}

export async function getRecipe(id) {
  const { rows } = await pool.query(`
    WITH (
      SELECT * FROM recipes
      WHERE name_url = $1
    )
  `, [id]);
  return rows[0]
}

async function addRecipeDetails({ name, name_url, category, description, keywords, notes, cook_time, prep_time }) {
  const details = [name, name_url, category, description, keywords, notes, cook_time, prep_time]
  const { rows } = await pool.query(`
    INSERT INTO recipes (
      name,
      name_url,
      category,
      description,
      keywords,
      notes,
      cook_time,
      prep_time
    ) VALUES (
      $1
    ) RETURNING id
  `, [details]);
  return rows[0]
}

export async function addRecipe(recipe) {
  // get name_url
  const existingNames = await getRecipeNames()
  recipe.name_url = generateNameUrl(existingNames, recipe.name)

  // save image
  saveImage(recipe.image, recipe.name_url)

  // convert keyword list into a comma separated string
  recipe.keywords = recipe.keywords.join(', ')
  console.log(recipe)

  // save main image details
  const id = await addRecipeDetails(recipe)
}