import UserModel from "./models/user-model";
import AuthController from "./controllers/recipes/auth-controller.ts";
import AuthView from "./views/recipes/auth-view.ts";
import UserController from "./controllers/recipes/user-controller.ts";
import UserView from "./views/recipes/user-view.ts";

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
  // const userModel = new UserModel();
  const userView = new UserView();
  const userController = new UserController(userModel, userView);
  userController.init();
});
