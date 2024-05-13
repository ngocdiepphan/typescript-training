import { renderRecipeTableTemplate } from "../../templates/recipe"
import { Recipe } from "../../models/recipe-model";

export default class RecipeView {
  private tableWrapperEl: HTMLElement;

  constructor() {
    this.tableWrapperEl = document.getElementById("table-wrapper") as HTMLElement;
  }

  renderTableRecipes = (data: Recipe[]): void => {
    this.tableWrapperEl.innerHTML = renderRecipeTableTemplate(data);
};
}
