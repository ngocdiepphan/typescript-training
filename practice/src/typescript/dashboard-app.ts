import UserModel from "./models/user-model";
import UserController from "./controllers/recipes/user-controller.ts";
import UserView from "./views/recipes/user-view.ts";
import { delegate } from "./helpers";
import RecipeController from "./controllers/recipes/recipe-controller.ts";
import RecipeModel from "./models/recipe-model.ts";
import RecipeView from "./views/recipes/recipe-view.ts";
import DashBoardController from "./controllers/recipes/dashboard-controller.ts";
import DashBoardView from "./views/recipes/dashboard-view.ts";

window.addEventListener("load", () => {
  const userModel = new UserModel();
  const userView = new UserView();
  const userController = new UserController(userModel, userView);

  const recipeModel = new RecipeModel();
  const recipeView = new RecipeView();
  const recipesController = new RecipeController(recipeModel, recipeView);
  
  const dashboardView = new DashBoardView();
  const dashboardController = new DashBoardController(dashboardView);

  userController.init();
  recipesController.init();
  dashboardController.init();

  const setNavigationActive = (type: string): void => {
    document
      .querySelector(".navigation__item .active")
      ?.classList.remove("active");
    const newRecipesBtn = document.getElementById("new-recipes") as HTMLElement;

    switch (type) {
      case "users":
        setActiveNavItem("users");
        newRecipesBtn.classList.add("hide");
        break;
      case "recipes":
        setActiveNavItem("recipes");
        newRecipesBtn.classList.remove("hide");
        break;
      default:
        break;
    }
  };

  const setActiveNavItem = (navId: string): void => {
    const navItem = document.querySelector(
      `.navigation__item[data-id='${navId}']`
    );
    navItem?.classList.add("active");
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("nav", navId);
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
