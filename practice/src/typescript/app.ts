import UserModel from "./models/user-model";
import AuthController from "./controllers/recipes/auth-controller.ts";
import AuthView from "./views/recipes/auth-view.ts";
import UserController from "./controllers/recipes/user-controller.ts";
import UserView from "./views/recipes/user-view.ts";
import { delegate } from "./helpers";
import RecipeController from "./controllers/recipes/recipe-controller.ts";
import RecipeModel from "./models/recipe-model.ts";
import RecipeView from "./views/recipes/recipe-view.ts";

window.addEventListener("load", () => {
  const userModel = new UserModel();
  const authView = new AuthView();
  const authController = new AuthController(userModel, authView);
  authController.init();

  const user = JSON.parse(localStorage.getItem("user") || "");
  const pathname = window.location.pathname;

  if (user && pathname !== "/dashboard.html") {
    window.location.replace("index.html");
  }

  if (pathname === "/dashboard.html") {
    if (user?.role !== "admin") {
      window.location.replace("login.html");
    }
  }

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
    const detailPanel = document.querySelector(
      ".content-dashboard"
    ) as HTMLElement;
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
