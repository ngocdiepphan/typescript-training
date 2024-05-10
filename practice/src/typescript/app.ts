import UserModel from "./models/user-model";
import AuthController from "./controllers/recipes/auth-controller.ts";
import AuthView from "./views/recipes/auth-view.ts";

window.addEventListener("load", () => {
  const userModel = new UserModel();
  const authView = new AuthView();
  const authController = new AuthController(
    userModel,
    authView
  );
  authController.init();
});
