import RecipeModel from "../../models/recipe";
import RecipeAppView from "../../views/recipe-app/homePage";
import { Recipe } from "../../types/recipe";
import RecipeService from "../../services/recipe";
import { RecipeApiResponse } from "../../services/helper";

export default class RecipeController {
  private recipeModel: RecipeModel;
  private recipeAppView: RecipeAppView;

  constructor(recipeModel: RecipeModel, recipeAppView: RecipeAppView) {
    this.recipeModel = recipeModel;
    this.recipeAppView = recipeAppView;
  }

  init = async (): Promise<void> => {
    this.handleViewRecipeHome();
  };

  /**
   * The handleViewRecipeHome function fetches recipes, updates the model with the fetched data,
   * and renders different types of recipes on the home view.
   */
  handleViewRecipeHome = async (): Promise<void> => {
    const { data } = await this.getRecipes();
    if (data) {
      this.recipeModel.setRecipes(data);
      this.recipeAppView.renderRecipe(data);

      /**
       * Render a list of delicious recipes, with collection_id of 1 and ratings of 5
       * Only take the first 3 recipes that meet the criteria
       */
      this.recipeAppView.renderDeliciousRecipe(
        data
          .filter(
            (item: Recipe) => item.collection_id === 1 && item.ratings === 5
          )
          .slice(0, 3)
      );

      /**
       *  Render a list of sweet recipes, with collection_id of 2 and ratings of 5
       * Only take the first 3 recipes that meet the criteria
       */
      this.recipeAppView.renderSweetRecipe(
        data
          .filter(
            (item: Recipe) => item.collection_id === 2 && item.ratings === 5
          )
          .slice(0, 3)
      );
    }
  };

  /**
   * Retrieves a list of recipes from the server.
   * @returns {Promise<RecipeApiResponse>} A Promise containing recipe list data from the server.
   */
  getRecipes = async (): Promise<RecipeApiResponse> => {
    return await RecipeService.fetchRecipes();
  };
}
