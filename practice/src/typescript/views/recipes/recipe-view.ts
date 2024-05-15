import {
  renderRecipeTableTemplate,
  renderRecipeDetails,
} from "../../templates/recipe";
import { Recipe } from "../../helpers/type-recipe";
import { delegate } from "../../helpers";

export default class RecipeView {
  private tableWrapperEl: HTMLElement;
  private userDetailsContainerEl: HTMLElement;
  private panelEl: HTMLElement;
  private tBodyEl: HTMLElement;

  constructor() {
    this.tableWrapperEl = document.getElementById(
      "table-wrapper"
    ) as HTMLElement;
    this.userDetailsContainerEl = document.querySelector(
      ".panel"
    ) as HTMLElement;
    this.panelEl = document.querySelector(".panel") as HTMLElement;
    this.tBodyEl = document.querySelector(".table__body") as HTMLElement;
  }

  bindCallback = (
    event: string,
    handler?: (recipeId: string) => void
  ): void => {
    switch (event) {
      case "recipeRowClick":
        this.tBodyEl = document.querySelector(
          ".table-body__recipe"
        ) as HTMLElement;
        if (this.tBodyEl && handler) {
          delegate(
            this.tBodyEl,
            ".recipe_item",
            "click",
            this.showRecipeById(handler)
          );
        }
        break;
      default:
        break;
    }
  };

  /**
   * Renders the recipes data table in the user interface.
   * @param {Recipe[]} data - An array containing recipe information.
   */
  renderTableRecipes = (data: Recipe[]): void => {
    this.tableWrapperEl.innerHTML = renderRecipeTableTemplate(data);
  };

  /**
   * The showRecipeById function handles the event when the user selects a recipe from the table and displays that recipe's details.
   * @param {function} handler - A function that handles when the showRecipeById event is triggered. It takes a recipeId (string) as its argument and returns void.
   * @param {(recipeId: string) => void} handler - A function that will be called with the recipe's ID.
   * @returns {(event: Event) => void} - A new function that can be called when a recipe row is clicked.
   */
  showRecipeById =
    (handler: (recipeId: string) => void) =>
    (event: Event): void => {
      const target = event.target as HTMLElement;
      const recipeRow = target.closest(".table__row") as HTMLElement;

      if (recipeRow) {
        const recipeId = recipeRow.dataset.id;
        if (recipeId) {
          handler(recipeId);
        }
      }
    };

  /**
   * Renders recipe details onto the panel element and adds the "show-panel" class to display the details panel.
   * Also attaches a click event listener to the back button to remove the "show-panel" class from the detail panel.
   * @param {Recipe} recipe - Details of the recipe to be rendered.
   */
  handleRenderRecipeDetails = ({
    id,
    imageURL,
    name,
    category,
    creator,
    ratings,
    description,
    instruction,
    ingredient,
    nutrition,
    createdAt,
  }: Recipe): void => {
    this.panelEl.innerHTML = renderRecipeDetails({
      id,
      imageURL,
      name,
      category,
      creator,
      ratings,
      description,
      instruction,
      ingredient,
      nutrition,
      createdAt,
    });
    this.userDetailsContainerEl.classList.add("show-panel");
    const btnBackEl = document.querySelector(".content-users") as HTMLElement;
    btnBackEl.addEventListener("click", () => {
      const detailPanel = document.querySelector(
        ".content-dashboard"
      ) as HTMLElement;
      detailPanel.classList.remove("show-panel");
    });
  };
}
