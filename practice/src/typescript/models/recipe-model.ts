import { Recipe } from "../types/recipe";
export default class RecipeModel {
  private recipes: Recipe[];

  constructor(
    private name?: string,
    private description?: string,
    private instruction?: string,
    private nutrition?: string,
    private creator?: string,
    private category?: string,
    private id?: string,
    private role?: string,
    private imageURL?: string,
    private ratings?: number,
    private createdAt?: string,
  ) {
    this.recipes = [];
  }

  /**
   * The setRecipes function updates recipes data in the application model.
   * @param {Recipe[]} data - An array containing new recipes data
   */
  setRecipes(data: Recipe[]): void {
    this.recipes = data;
  }

  /**
   * The getRecipeById function retrieves a recipes from the application model based on its ID.
   * @param {string} id - The ID of the recipes to retrieve
   * @returns {Recipe|undefined} - The recipes object if found, or undefined if not found
   */
  getRecipeById = (id: string) => {
    return this.recipes.find((recipe) => recipe.id === id);
  }
}
