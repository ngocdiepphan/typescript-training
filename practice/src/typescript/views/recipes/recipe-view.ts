import {
  renderRecipeTableTemplate,
  renderRecipeDetails,
} from "../../templates/recipe";
import {
  Recipe,
  EditRecipeHandler,
  DeleteRecipeHandler,
  AddRecipeHandler,
} from "../../helpers/type-recipe";
import { bindEvent, delegate } from "../../helpers";

export default class RecipeView {
  private tableWrapperEl: HTMLElement;
  private userDetailsContainerEl: HTMLElement;
  private panelEl: HTMLElement;
  private tBodyEl: HTMLElement;
  private sidebarDetailEl: HTMLElement;
  private selectAddEl: HTMLElement;
  private nameEl: HTMLElement;
  private imageEl: HTMLElement;
  private desEL: HTMLElement;
  private categoryEl: HTMLElement;
  private creatorEl: HTMLElement;
  private ratingEl: HTMLElement;

  constructor() {
    this.tableWrapperEl = document.getElementById(
      "table-wrapper"
    ) as HTMLElement;
    this.userDetailsContainerEl = document.querySelector(
      ".panel"
    ) as HTMLElement;
    this.panelEl = document.querySelector(".panel") as HTMLElement;
    this.tBodyEl = document.querySelector(".table__body") as HTMLElement;
    this.sidebarDetailEl = document.getElementById(
      "panel-details"
    ) as HTMLElement;
    this.selectAddEl = document.getElementById(
      "form-add-recipes"
    ) as HTMLElement;
    this.nameEl = document.getElementById("input_name") as HTMLElement;
    this.imageEl = document.getElementById("input_image") as HTMLElement;
    this.desEL = document.getElementById("input_description") as HTMLElement;
    this.categoryEl = document.getElementById("input_category") as HTMLElement;
    this.creatorEl = document.getElementById("input_creator") as HTMLElement;
    this.ratingEl = document.getElementById("input_ratings") as HTMLElement;
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
      case "editRecipe":
        this.sidebarDetailEl = document.getElementById(
          "panel-details"
        ) as HTMLElement;
        if (this.sidebarDetailEl && handler) {
          delegate(
            this.sidebarDetailEl,
            ".btn-edit-recipe",
            "click",
            this.editRecipe(handler)
          );
        }
        break;
      case "deleteRecipe":
        this.sidebarDetailEl = document.getElementById(
          "panel-details"
        ) as HTMLElement;
        if (this.sidebarDetailEl) {
          delegate(
            this.sidebarDetailEl,
            ".btn-delete-recipe",
            "click",
            this.deleteRecipe(handler)
          );
        }
        break;
      case "addRecipe":
        bindEvent(this.selectAddEl, "submit", this.addRecipe(handler));
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
    const btnBackEl = document.querySelector(
      ".panel__edit .icon-back"
    ) as HTMLElement;

    btnBackEl.addEventListener("click", () => {
      const detailPanel = document.querySelector(
        ".content-dashboard"
      ) as HTMLElement;
      detailPanel.classList.remove("show-panel");
      btnBackEl.removeEventListener("click", () => {});
    });
  };

  /**
   * The editRecipe function extracts information from input fields and invokes a handler function to edit a recipe.
   * @param {function} handler - The handler function to be invoked with the updated recipe information.
   * @param {Event} event - The event triggered by interacting with a DOM element.
   */
  editRecipe =
    (handler: EditRecipeHandler) =>
    (event: Event): void => {
      const recipesImage = (
        document.getElementById("image-input") as HTMLInputElement
      ).value.trim();
      const recipesNameInput = (
        document.getElementById("recipe-name-input") as HTMLInputElement
      ).value.trim();
      const recipesCategory = (
        document.getElementById("recipe-category-input") as HTMLInputElement
      ).value.trim();
      const recipesCreator = (
        document.getElementById("recipe-creator-input") as HTMLInputElement
      ).value.trim();
      const recipesRatings = (
        document.getElementById("recipe-ratings-input") as HTMLInputElement
      ).value.trim();
      const recipesDes = (
        document.getElementById("recipe-description-input") as HTMLInputElement
      ).value.trim();
      const recipesId = document
        .querySelector(".panel__confirm")
        ?.getAttribute("data-id");
      if (recipesId) {
        handler(
          recipesId,
          recipesImage,
          recipesNameInput,
          recipesCategory,
          recipesCreator,
          recipesRatings,
          recipesDes
        );
      }
    };

  /**
   * The deleteRecipe function extracts the ID of a recipe from a DOM element and invokes a handler function to delete the recipe.
   * @param {DeleteRecipeHandler} handler - The handler function to be invoked with the recipe ID for deletion.
   * @param {Event} event - The event triggered by interacting with a DOM element.
   */
  deleteRecipe =
    (handler: DeleteRecipeHandler) =>
    (event: Event): void => {
      const recipesId = document
        .querySelector(".panel__confirm")
        ?.getAttribute("data-id");
      if (recipesId) {
        handler(recipesId);
      }
    };

  /**
   * The addRecipe function extracts information from input fields and invokes a handler function to add a new recipe.
   * @param {AddRecipeHandler} handler - The handler function to be invoked with the new recipe information.
   */
  addRecipe =
    (handler: AddRecipeHandler) =>
    (event: Event): void => {
      event.preventDefault();
      const newRecipe: Recipe = {
        name: (this.nameEl as HTMLInputElement).value,
        imageURL: (this.imageEl as HTMLInputElement).value,
        category: (this.categoryEl as HTMLInputElement).value,
        creator: (this.creatorEl as HTMLInputElement).value,
        ratings: parseInt((this.ratingEl as HTMLInputElement).value),
        description: (this.desEL as HTMLInputElement).value,
        ingredient: "",
        instruction: "",
        id: "",
        createdAt: "",
        nutrition: "",
      };
      handler(newRecipe);
      this.selectAddEl.classList.add("show-form");
      alert("Recipe added successfully!");
    };
}
