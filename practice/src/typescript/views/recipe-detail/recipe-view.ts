import { Recipe } from "../../helpers/type-recipe";
import { renderRecipeDetailTemplate } from "../../templates/recipe";

export default class RecipeDetailView {
  private recipeDetailEL: HTMLElement;

  constructor() {
    this.recipeDetailEL = document.getElementById(
      "recipe-details"
    ) as HTMLElement;
  }

  /**
   * Renders the details of a recipe on the recipe page.
   * @param {Recipe} recipeItem - The recipe item containing details to be rendered.
   */
  renderRecipePageDetail = (recipeItem: Recipe): void => {
    this.recipeDetailEL.innerHTML = renderRecipeDetailTemplate(recipeItem);
  };
}
