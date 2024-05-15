import RecipeModel from "../../models/recipe-model";
import RecipeView from "../../views/recipes/recipe-view";
import { RecipeApiResponse } from "../../services/helper";
import RecipeService from "../../services/recipe-service";

export default class RecipeController {
  private recipeModel: RecipeModel;
  private recipeView: RecipeView;

  constructor(recipeModel: RecipeModel, recipeView: RecipeView) {
    this.recipeModel = recipeModel;
    this.recipeView = recipeView;
  }

  init = async (): Promise<void> => {};

  /**
   * handleViewRecipes function retrieves recipes data, sets it in the recipe model, renders the recipes table,
   * and binds the callback for handling recipe row click events to display recipe details.
   * @returns {Promise<void>} - A Promise that resolves once the recipes data is retrieved and processed.
   */
  handleViewRecipes = async (): Promise<void> => {
    const { data } = await this.getRecipes();
    this.recipeModel.setRecipes(data);
    this.recipeView.renderTableRecipes(data);
    this.recipeView.bindCallback(
      "recipeRowClick",
      this.handleShowRecipeDetails
    );
  };

  /**
   * handleShowRecipeDetails function handles the event when a recipe is selected from the table and displays that recipe's details.
   * @param {string} recipeId - The ID of the selected recipe.
   */
  handleShowRecipeDetails = (recipeId: string): void => {
    const recipe = this.recipeModel.getRecipeById(recipeId);
    this.recipeView.handleRenderRecipeDetails(recipe);
  };

  /**
   * Retrieves a list of recipes from the server through the RecipeService.
   * @returns {Promise<RecipeApiResponse>} - A Promise containing the list of recipes from the server.
   */
  getRecipes = async (): Promise<RecipeApiResponse> => {
    return await RecipeService.fetchRecipes();
  };
}
