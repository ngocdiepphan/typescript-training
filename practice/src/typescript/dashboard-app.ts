import UserModel from "./models/user.ts";
import UserController from "./controllers/dashboards/user.ts";
import { delegate } from "./helpers";
import RecipeController from "./controllers/dashboards/recipe.ts";
import RecipeModel from "./models/recipe.ts";
import RecipeView from "./views/dashboards/recipe.ts";
import DashBoardController from "./controllers/dashboards/toggle.ts";
import DashBoardView from "./views/dashboards/toggle.ts";
import UserView from "./views/dashboards/user.ts";

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

  // Function to set the active navigation item and update UI based on the provided type.
  const setNavigationActive = (type: string): void => {
    document
      .querySelector(".navigation__item .active")
      ?.classList.remove("active");
    const newRecipesBtn = document.getElementById("new-recipes") as HTMLElement;

    // Depending on the type, set the active state for the navigation item and show/hide the "new recipes" button.
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

  // Function to set the active state for the navigation item with the specified ID and update URL parameters.
  const setActiveNavItem = (navId: string): void => {
    const navItem = document.querySelector(
      `.navigation__item[data-id='${navId}']`
    );
    navItem?.classList.add("active");

    // Update URL parameters to reflect the current navigation state.
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("nav", navId);
  };

  // Add a delegated event listener to the navigation element to handle navigation item clicks.
  delegate(
    document.querySelector(".navigation") as HTMLElement,
    ".navigation__item",
    "click",
    (event: Event) => {
      const handleNavigationItemClick = () => {
        event.preventDefault();
        const target = event.target as HTMLElement;
        const closestNavItem = target?.closest(
          ".navigation__item"
        ) as HTMLElement | null;
        const type = closestNavItem?.dataset.id;

        if (type) {
          setNavigationActive(type);

          // Update the toolbar title based on the selected navigation type.
          const toolEl = document.querySelector<HTMLElement>(".toolbar__title");
          if (toolEl) {
            if (type === "users") {
              toolEl.textContent = "User";
            } else {
              toolEl.textContent = "Recipes";
            }
          }

          // Trigger appropriate controller methods based on the selected navigation type.
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
      };

      handleNavigationItemClick();
    }
  );
});
