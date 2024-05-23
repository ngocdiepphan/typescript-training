import RecipeDetailView from "./views/recipe/detail";
import RecipeDetailController from "./controllers/recipe/detail";

window.addEventListener("load", () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const pathname = window.location.pathname;

  if (!user && pathname !== "/login.html" && pathname !== "/sign-up.html") {
    window.location.replace("login.html");
  }

  const recipeDetailView = new RecipeDetailView();
  const recipeDetailController = new RecipeDetailController(
    recipeDetailView
  );
  recipeDetailController.init();
});
