import UserModel from "./models/user-model";
import AuthenticationController from "./controllers/recipes/authentication-controller.ts";
import AuthenticationView from "./views/recipes/authentication-view.ts";

window.addEventListener("load", () => {
  const userModel = new UserModel();
  const authenticationView = new AuthenticationView();
  const authenticationController = new AuthenticationController(
    userModel,
    authenticationView
  );
  authenticationController.init();
});
