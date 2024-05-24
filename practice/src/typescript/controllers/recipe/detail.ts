import RecipeDetailView from "../../views/recipe/detail";
import RecipeService from "../../services/recipe";
import { RecipeApiResponse } from "../../services/helper";

export default class RecipeDetailController {
  private recipeDetailView: RecipeDetailView;
  private urlParams: URLSearchParams;

  constructor( recipeDetailView: RecipeDetailView) {
    this.recipeDetailView = recipeDetailView;
  }

  init = async (): Promise<void> => {
    this.urlParams = new URLSearchParams(window.location.search);
    const recipeId = this.urlParams.get("id");

    if (!recipeId) {
      console.error("Recipe ID is null");
      return;
    }

    const response = await this.getRecipeDetail(recipeId);

    if (response.data && response.data.length > 0) {
      this.recipeDetailView.renderRecipePageDetail(response.data[0]);
    } else if (response.error) {
      console.error(response.error.message);
    } else {
      console.error("No data found for the given recipe ID");
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
