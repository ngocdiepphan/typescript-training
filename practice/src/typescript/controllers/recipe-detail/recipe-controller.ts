import RecipeModel from "../../models/recipe-model";
import RecipeDetailView from "../../views/recipe-detail/recipe-view";
import RecipeService from "../../services/recipe-service";
import { RecipeApiResponse } from "../../services/helper

export default class RecipeDetailController {
  private recipeModel: RecipeModel;
  private recipeDetailView: RecipeDetailView;

  constructor(recipeModel: RecipeModel, recipeDetailView: RecipeDetailView) {
    this.recipeModel = recipeModel;
    this.recipeDetailView = recipeDetailView;
  }

  init = async (): Promise<void> => {
    this.urlParams = new URLSearchParams(window.location.search);
    const { result } = await this.getRecipeDetail(this.urlParams.get("id"));
    this.recipeDetailView.renderRecipePageDetail(result[0]);
  };

  /**
   * The getRecipeDetail function fetches detailed information about a recipe based on its ID.
   * @param {string} id - The ID of the recipe to fetch details for.
   * @returns {Promise<RecipeApiResponse>} - A Promise that resolves to the detailed information of the recipe.
   */
  getRecipeDetail = async (id: string): Promise<RecipeApiResponse> => {
    return await RecipeService.fetchRecipeDetail(id);
  };
}
