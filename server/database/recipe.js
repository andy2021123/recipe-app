import pool from "./index.js"
import format from 'pg-format'
import generateNameUrl from '../utils/generateNameUrl.js'

export async function getRecipes() {
  const { rows } = await pool.query(`
    SELECT name_url AS id, name, category, description
    FROM recipes
  `);
  return rows
}

export async function getLatestRecipes(count) {
  const { rows } = await pool.query(`
    SELECT name_url AS id, name, category, description
    FROM recipes 
    ORDER BY ts DESC
    LIMIT $1
  `, [count]);
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
        SELECT json_agg(
          instructions.name 
          ORDER BY instructions.index
        )
        FROM instructions
        WHERE recipe_id = recipes.id
      ) AS instructions
    FROM recipes
    WHERE name_url = $1
    GROUP BY recipes.id
  `, [id]);
  return rows[0]
}

export async function getRecipeMeta(id) {
  const { rows } = await pool.query(`
    SELECT 
      id, name, description
    FROM recipes
    WHERE name_url = $1
  `, [id]);
  return rows[0] || { id: null, name: "Recipe Doesn't Exist", description: null}
}

export async function deleteRecipe(name_url) {
  const { id } = await getRecipeMeta(name_url) 
  await pool.query(`DELETE FROM ingredients WHERE recipe_id = $1`, [id])
  await pool.query(`DELETE FROM instructions WHERE recipe_id = $1`, [id])
  await pool.query(`DELETE FROM recipes WHERE id = $1`, [id])
}

async function addRecipeDetails({ name, name_url, category, description, keywords, notes, cook_time, prep_time, url }) {
  const details = [name, name_url, category, description, keywords, notes, parseInt(cook_time) || null, parseInt(prep_time) || null, url]
  const { rows } = await pool.query(format(`
  INSERT INTO recipes (
    name,
    name_url,
    category,
    description,
    keywords,
    notes,
    cook_time,
    prep_time,
    url
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

  // add the recipe to the database
  const { id, name_url } = await addRecipeDetails(recipe)
  await addIngredients(id, recipe)
  await addInstructions(id, recipe)

  return name_url
}