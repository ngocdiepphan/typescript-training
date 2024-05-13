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

  handleViewRecipes = async (): Promise<void> => {
    const { data } = await this.getRecipes();
    this.recipeModel.setRecipes(data);
    this.recipeView.renderTableRecipes(data);
  };

  /**
   * The getRecipes function retrieves a list of recipes from the server through RecipeService.
   * @returns {Promise<ApiResponse>} - A Promise containing recipe list data from the server.
   */
  getRecipes = async (): Promise<RecipeApiResponse> => {
    return await RecipeService.fetchRecipes();
  };
}
