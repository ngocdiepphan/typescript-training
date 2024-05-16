import RecipeModel from "./models/recipe-model";
import RecipeAppView from "./views/recipe-app/recipe-view";
import RecipeController from "./controllers/recipe-app/recipe-controller";

window.addEventListener("load", () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const pathname = window.location.pathname;

  if (!user && pathname !== "/login.html" && pathname !== "/sign-up.html") {
    window.location.replace("login.html");
  }

  const recipeModel = new RecipeModel();
  const recipeAppView = new RecipeAppView();
  const recipeAppController = new RecipeController(
    recipeModel,
    recipeAppView
  );
  recipeAppController.init();
});
