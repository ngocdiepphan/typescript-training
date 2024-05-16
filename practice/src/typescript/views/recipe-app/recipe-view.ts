import { Recipe } from "../../helpers/type-recipe";
import {
  renderListRecipesTemplate,
  renderListRecipesByCollectionTemplate,
  renderListRecipesBySweetTemplate,
} from "../../templates/recipe";

export default class recipeAppView {
  private recipesListEl: HTMLElement;
  private deliciousEl: HTMLElement;
  private sweetEl: HTMLElement;
  private outEL: HTMLElement;

  constructor() {
    this.recipesListEl = document.getElementById(
      "latest-recipes"
    ) as HTMLElement;
    this.deliciousEl = document.getElementById(
      "delicious-recipes"
    ) as HTMLElement;
    this.sweetEl = document.getElementById("sweet-recipes") as HTMLElement;
    this.outEL = document.querySelector(".navbar__icon-logout") as HTMLElement;
  }

  /**
   * The renderRecipe method renders a list of recipes on the page.
   * @param {Recipe[]} data - An array of recipe objects to be rendered.
   */
  renderRecipe = (data: Recipe[]): void => {
    this.recipesListEl.innerHTML = renderListRecipesTemplate(data);
  };

  /**
   * The renderDeliciousRecipe method renders a list of delicious recipes on the page.
   * @param {Recipe[]} data - An array of recipe objects categorized as delicious.
   */
  renderDeliciousRecipe = (data: Recipe[]): void => {
    this.deliciousEl.innerHTML = renderListRecipesByCollectionTemplate(data);
  };

  /**
   * The renderSweetRecipe method renders a list of sweet recipes on the page.
   * @param {Recipe[]} data - An array of recipe objects categorized as sweet.
   */
  renderSweetRecipe = (data: Recipe[]): void => {
    this.sweetEl.innerHTML = renderListRecipesBySweetTemplate(data);
  };
}
