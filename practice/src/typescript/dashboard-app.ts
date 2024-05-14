import UserModel from "./models/user-model";
import UserController from "./controllers/recipes/user-controller.ts";
import UserView from "./views/recipes/user-view.ts";
import { delegate } from "./helpers";
import RecipeController from "./controllers/recipes/recipe-controller.ts";
import RecipeModel from "./models/recipe-model.ts";
import RecipeView from "./views/recipes/recipe-view.ts";

window.addEventListener("load", () => {
  const userModel = new UserModel();
  const userView = new UserView();
  const userController = new UserController(userModel, userView);

  const recipeModel = new RecipeModel();
  const recipeView = new RecipeView();
  const recipesController = new RecipeController(recipeModel, recipeView);

  userController.init();
  recipesController.init();

  const setNavigationActive = (type: string): void => {
    document
      .querySelector(".navigation__item.active")
      ?.classList.remove("active");
    const urlParams = new URLSearchParams(window.location.search);
  };

  delegate(
    document.querySelector(".navigation"),
    ".navigation__item",
    "click",
    (event: Event) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      const type = target.closest(".navigation__item")?.dataset.id;
      if (type) {
        setNavigationActive(type);
        const toolEl = document.querySelector(".toolbar__title") as HTMLElement;
        if (type === "users") {
          toolEl.textContent = "User";
          userController.handleViewUsers();
        } else if (type === "recipes") {
          toolEl.textContent = "Recipes";
          recipesController.handleViewRecipes();
        }
      }
    }
  );
});
