import pool from "./index.js"
import format from 'pg-format'
import generateNameUrl from '../utils/generateNameUrl.js'
import { saveImage } from "../utils/image.js";

export async function getRecipes() {
  const { rows } = await pool.query(`
    SELECT name_url AS id, name, category, description
    FROM recipes
  `);
  return rows
}

export async function getCategoryRecipes(category) {
  const { rows } = await pool.query(`
    SELECT name_url AS id, name, category, description
    FROM recipes
    WHERE category = $1
  `, [category]);
  return rows
}

async function getRecipeNames() {
  const { rows } = await pool.query(`
    SELECT name FROM recipes
  `);
  return rows.map(rows => rows.name)
}

export async function getRecipe(id) {
  const { rows } = await pool.query(`
    SELECT 
      *, (
        SELECT json_agg(ingredients.name)
        FROM ingredients
        WHERE recipe_id = recipes.id
      ) AS ingredients, (
        SELECT json_agg(instructions.name)
        FROM instructions
        WHERE recipe_id = recipes.id
      ) AS instructions
    FROM recipes
    WHERE name_url = $1
    GROUP BY recipes.id
  `, [id]);
  return rows[0]
}

async function addRecipeDetails({ name, name_url, category, description, keywords, notes, cook_time, prep_time }) {
  const details = [name, name_url, category, description, keywords, notes, parseInt(cook_time) || null, parseInt(prep_time) || null]
  const { rows } = await pool.query(format(`
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
    %L
  ) RETURNING id, name_url
`, details));
  return rows[0]
}

async function addIngredients(id, { ingredients }) {
  const details = ingredients.map((ingredient) => [id, ingredient])
  await pool.query(format(`
    INSERT INTO ingredients (
      recipe_id, name
    ) VALUES %L
  `, details))
}

async function addInstructions(id, { instructions }) {
  const details = instructions.map((ingredient, index) => [id, index, ingredient])
  await pool.query(format(`
    INSERT INTO instructions (
      recipe_id, index, name
    ) VALUES %L
  `, details))
}

export async function addRecipe(recipe) {
  // get name_url
  const existingNames = await getRecipeNames()
  recipe.name_url = generateNameUrl(existingNames, recipe.name)

  // convert keyword list into a comma separated string
  recipe.keywords = recipe.keywords.join(', ')

  // save main image details
  const { id, name_url } = await addRecipeDetails(recipe)

  await addIngredients(id, recipe)
  await addInstructions(id, recipe)

  console.log('success')
  return name_url
}