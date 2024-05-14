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
   * Retrieves a list of recipes from the server through the RecipeService.
   * @returns {Promise<RecipeApiResponse>} - A Promise containing the list of recipes from the server.
   */
  handleViewRecipes = async (): Promise<void> => {
    const { data } = await this.getRecipes();
    this.recipeModel.setRecipes(data);
    this.recipeView.renderTableRecipes(data);
  };

  /**
   * Retrieves a list of recipes from the server through the RecipeService.
   * @returns {Promise<RecipeApiResponse>} - A Promise containing the list of recipes from the server.
   */
  getRecipes = async (): Promise<RecipeApiResponse> => {
    return await RecipeService.fetchRecipes();
  };
}
