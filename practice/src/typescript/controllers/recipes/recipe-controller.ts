import RecipeModel from "../../models/recipe-model";
import RecipeView from "../../views/recipes/recipe-view";
import { RecipeApiResponse } from "../../services/helper";
import RecipeService from "../../services/recipe-service";
import { Recipe } from "../../helpers/type-recipe";

export default class RecipeController {
  private recipeModel: RecipeModel;
  private recipeView: RecipeView;

  constructor(recipeModel: RecipeModel, recipeView: RecipeView) {
    this.recipeModel = recipeModel;
    this.recipeView = recipeView;
  }

  init = async (): Promise<void> => {
    this.recipeView.bindCallback("editRecipe", this.handleEditRecipe);
    this.recipeView.bindCallback("deleteRecipe", this.handleDeleteRecipe);
    this.recipeView.bindCallback("addRecipe", this.handleAddRecipe);
  };

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
   * Handles editing a recipe with the provided details.
   * @param {string} recipeId - The ID of the recipe to be edited.
   * @param {string} newRecipeImage - The new image URL for the recipe.
   * @param {string} newRecipeName - The new name for the recipe.
   * @param {string} newRecipeCategory - The new category for the recipe.
   * @param {string} newRecipeCreator - The new creator for the recipe.
   * @param {number} newRecipeRating - The new rating for the recipe.
   * @param {string} newRecipeDescription - The new description for the recipe.
   * @returns {Promise<void>} - A Promise indicating the success or failure of the operation.
   */
  handleEditRecipe = async (
    recipeId: string,
    newRecipeImage: string,
    newRecipeName: string,
    newRecipeCategory: string,
    newRecipeCreator: string,
    newRecipeRating: number,
    newRecipeDescription: string
  ): Promise<void> => {
    const recipe = this.recipeModel.getRecipeById(recipeId);
    await RecipeService.editRecipe(recipeId, {
      ...recipe,
      imageURL: newRecipeImage,
      name: newRecipeName,
      category: newRecipeCategory,
      creator: newRecipeCreator,
      ratings: newRecipeRating,
      description: newRecipeDescription,
    });

    alert("Updated recipe successfully!");
    this.handleViewRecipes();
  };

  /**
   * The handleDeleteRecipe function deletes a recipe.
   * @param {string} recipeId - The ID of the recipe to delete.
   */
  handleDeleteRecipe = async (recipeId: string): Promise<void> => {
    await RecipeService.deleteRecipe(recipeId);
    alert("Deleted recipe successfully!");
    this.handleViewRecipes();
  };

  /**
   * The handleAddRecipe function adds a new recipe.
   * @param {Recipe} recipeData - An object containing recipe details.
   */
  handleAddRecipe = async (recipeData: Recipe): Promise<void> => {
    await RecipeService.createRecipe(recipeData);
    this.handleViewRecipes();
  };
  /**
   * Retrieves a list of recipes from the server through the RecipeService.
   * @returns {Promise<RecipeApiResponse>} - A Promise containing the list of recipes from the server.
   */
  getRecipes = async (): Promise<RecipeApiResponse> => {
    return await RecipeService.fetchRecipes();
  };
}
