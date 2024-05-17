import RecipeModel from "../../models/recipe-model";
import RecipeDetailView from "../../views/recipe-detail/recipe-view";
import RecipeService from "../../services/recipe-service";
import { RecipeApiResponse } from "../../services/helper";

export default class RecipeDetailController {
  private recipeModel: RecipeModel;
  private recipeDetailView: RecipeDetailView;
  private urlParams: URLSearchParams;

  constructor(recipeModel: RecipeModel, recipeDetailView: RecipeDetailView) {
    this.recipeModel = recipeModel;
    this.recipeDetailView = recipeDetailView;
  }

  init = async (): Promise<void> => {
    this.urlParams = new URLSearchParams(window.location.search);
    const { data } = await this.getRecipeDetail(this.urlParams.get("id")!);
    if (data) {
      this.recipeDetailView.renderRecipePageDetail(data[0]);
    } else {
      console.error("No recipe data returned.");
    }
  };

  /**
   * The getRecipeDetail function fetches detailed information about a recipe based on its ID.
   * @param {string} id - The ID of the recipe to fetch details for.
   * @returns {Promise<RecipeApiResponse>} - A Promise that resolves to the detailed information of the recipe.
   */
  getRecipeDetail = (id: string): Promise<RecipeApiResponse> => {
    return RecipeService.fetchRecipeDetail(id);
  };
}
