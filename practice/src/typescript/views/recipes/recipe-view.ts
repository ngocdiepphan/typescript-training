import { renderRecipeTableTemplate } from "../../templates/recipe";
import { Recipe } from "../../helpers/type-recipe";

export default class RecipeView {
  private tableWrapperEl: HTMLElement;

  constructor() {
    this.tableWrapperEl = document.getElementById(
      "table-wrapper"
    ) as HTMLElement;
  }

  /**
   * Renders the recipes data table in the user interface.
   * @param {Recipe[]} data - An array containing recipe information.
   */
  renderTableRecipes = (data: Recipe[]): void => {
    this.tableWrapperEl.innerHTML = renderRecipeTableTemplate(data);
  };
}
