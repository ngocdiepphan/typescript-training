export interface Recipe {
  name: string;
  description: string;
  ingredient: string[];
  instruction: string;
  nutrition: string;
  creator: string;
  category: string;
  id: string;
  role: string;
  imageURL: string;
  ratings: number;
  createdAt: Date;
}

export default class RecipeModel {
  private recipes: Recipe[];

  constructor(
    private name?: string,
    private description?: string,
    private ingredient?: string[],
    private instruction?: string,
    private nutrition?: string,
    private creator?: string,
    private category?: string,
    private id?: string,
    private role?: string,
    private imageURL?: string,
    private ratings?: number,
    private createdAt?: Date
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
  getRecipeById(id: string): Recipe | undefined {
    return this.recipes.find((recipe) => recipe.id === id);
  }
}
