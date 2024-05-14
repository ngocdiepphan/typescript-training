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
    const newRecipesBtn = document.getElementById("new-recipes") as HTMLElement;
    
    switch (type) {
      case "users":
        const usersNavItem = document.querySelector(
          ".navigation__item[data-id='users']"
        );
        usersNavItem?.classList.add("active");
        const usersUrlParams = new URLSearchParams(window.location.search);
        usersUrlParams.set("nav", "users");
        newRecipesBtn.classList.add("hide");
        break;
      case "recipes":
        const recipesNavItem = document.querySelector(
          ".navigation__item[data-id='recipes']"
        );
        recipesNavItem?.classList.add("active");
        const recipesUrlParams = new URLSearchParams(window.location.search);
        recipesUrlParams.set("nav", "recipes");
        newRecipesBtn.classList.remove("hide");
        break;
      default:
        break;
    }
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

        const toolEl = document.querySelector<HTMLElement>(".toolbar__title");
        if (toolEl) {
          if (type === "users") {
            toolEl.textContent = "User";
          } else {
            toolEl.textContent = "Recipes";
          }
        }

        switch (type) {
          case "users":
            userController.handleViewUsers();
            break;
          case "recipes":
            recipesController.handleViewRecipes();
            break;
          default:
            break;
        }
      }
    }
  );
});
