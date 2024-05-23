import RecipeModel from "./models/recipe";
import RecipeDetailView from "./views/recipe/detail";
import RecipeDetailController from "./controllers/recipe/detail";

window.addEventListener("load", () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const pathname = window.location.pathname;

  if (!user && pathname !== "/login.html" && pathname !== "/sign-up.html") {
    window.location.replace("login.html");
  }

  const recipeModel = new RecipeModel();
  const recipeDetailView = new RecipeDetailView();
  const recipeDetailController = new RecipeDetailController(
    recipeModel,
    recipeDetailView
  );
  recipeDetailController.init();
});
