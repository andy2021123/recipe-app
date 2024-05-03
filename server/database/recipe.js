import pool from "./index.js"
import format from 'pg-format'
import generateNameUrl from '../utils/generateNameUrl.js'

export default class Recipe {
  constructor({ name, category, description, ingredients, instructions, keywords, notes, cook_time, prep_time, url, name_url }) {
    this.name = name.slice(0, 254)
    this.category = category.slice(0, 62)
    this.description = description?.slice(0, 999) || null
    this.ingredients = ingredients.map(ingredient => ingredient.slice(0, 999))
    this.instructions = instructions.map(instruction => instruction.slice(0, 999))
    this.keywords = keywords?.join(', ').slice(0, 254) || null
    this.notes = notes?.slice(0, 999) || null
    this.cook_time = parseInt(cook_time) || null
    this.prep_time = parseInt(prep_time) || null
    this.url = url?.slice(0, 999) || null
    this.name_url = name_url
  }

  // private methods
  async _addRecipeDetails() {
    const details = [this.name, this.name_url, this.category, this.description, this.keywords, this.notes, this.cook_time, this.prep_time, this.url]
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
      ) RETURNING id
    `, details));
    return rows[0]
  }

  async _updateRecipeDetails() {
    const { rows } = await pool.query(`
      UPDATE recipes
      SET 
        category = $1, 
        description = $2, 
        keywords = $3, 
        notes = $4, 
        cook_time = $5, 
        prep_time = $6
      WHERE name_url = $7
      RETURNING id
    `, [this.category, this.description, this.keywords, this.notes, this.cook_time, this.prep_time, this.name_url]);
    return rows[0]
  }

  async _addIngredients(id) {
    const details = this.ingredients.map((ingredient) => [id, ingredient])
    await pool.query(format(`
      INSERT INTO ingredients (
        recipe_id, name
      ) VALUES %L
    `, details))
  }

  async _deleteIngredients(id) {
    await pool.query(`DELETE FROM ingredients WHERE recipe_id = $1`, [id])
  }
  
  async _addInstructions(id) {
    const details = this.instructions.map((ingredient, index) => [id, index, ingredient])
    await pool.query(format(`
      INSERT INTO instructions (
        recipe_id, index, name
      ) VALUES %L
    `, details))
  }

  async _deleteInstructions(id) {
    await pool.query(`DELETE FROM instructions WHERE recipe_id = $1`, [id])
  }
  
  // public methods
  async addToDatabase() {
    // get name_url
    const existingNames = await Recipe.getRecipeNames()
    this.name_url = generateNameUrl(existingNames, this.name)
  
    // add the recipe to the database
    const { id } = await this._addRecipeDetails(this.name_url)
    await this._addIngredients(id)
    await this._addInstructions(id)
  
    return this.name_url
  }

  async updateDatabase() {
    // update recipe details
    const { id } = await this._updateRecipeDetails(this.name_url)
    console.log('updated details')

    // delete ingredients and instructions
    await this._deleteIngredients(id)
    await this._deleteInstructions(id)
    console.log('deleted ingredients and instructions')

    // add updated ingredients and instructions
    await this._addIngredients(id)
    await this._addInstructions(id)
    console.log('added ingredients and instructions')
  }

  // static methods
  static async getRecipe(name_url) {
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
    `, [name_url]);
    return rows[0]
  }

  static async getRecipeNames() {
    const { rows } = await pool.query(`
      SELECT name FROM recipes
    `);
    return rows.map(rows => rows.name)
  }

  static async getRecipes() {
    const { rows } = await pool.query(`
      SELECT name_url AS id, name, category, description
      FROM recipes
      ORDER BY ts DESC
      `);
    return rows
  }

  static async getLatestRecipes(count) {
    const { rows } = await pool.query(`
      SELECT name_url AS id, name, category, description
      FROM recipes 
      ORDER BY ts DESC
      LIMIT $1
    `, [count]);
    return rows
  }

  static async getCategoryRecipes(category) {
    const { rows } = await pool.query(`
      SELECT name_url AS id, name, category, description
      FROM recipes
      WHERE category = $1
    `, [category]);
    return rows
  }

  static async getRecipeMeta(name_url) {
    const { rows } = await pool.query(`
      SELECT 
        id, name, description
      FROM recipes
      WHERE name_url = $1
    `, [name_url]);
    return rows[0] || { id: null, name: "Recipe Doesn't Exist", description: null}
  }

  static async deleteRecipe(name_url) {
    const { id } = await Recipe.getRecipeMeta(name_url) 
    await pool.query(`DELETE FROM ingredients WHERE recipe_id = $1`, [id])
    await pool.query(`DELETE FROM instructions WHERE recipe_id = $1`, [id])
    await pool.query(`DELETE FROM recipes WHERE id = $1`, [id])
  }
}