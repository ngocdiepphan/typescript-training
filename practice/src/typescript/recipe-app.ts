import RecipeModel from "./models/recipe";
import RecipeAppView from "./views/recipe-app/home-page";
import RecipeController from "./controllers//recipe-app/home-page";

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
