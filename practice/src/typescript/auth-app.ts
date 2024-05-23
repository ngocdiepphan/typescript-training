import AuthController from "./controllers/account/auth.ts";
import AuthView from "./views/account/auth.ts";

// Add an event listener for when the window has finished loading
window.addEventListener("load", () => {
  const authView = new AuthView();
  const authController = new AuthController( authView);
  authController.init();

  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "");

  // Get the current pathname of the window
  const pathname = window.location.pathname;

  // If there is a user and the pathname is not the dashboard page
  if (user && pathname !== "/dashboard.html") {
    // Redirect the user to the index page
    window.location.replace("index.html");
  }

  // If the pathname is the dashboard page
  if (pathname === "/dashboard.html") {
    // Check if the user is not an admin
    if (user?.role !== "admin") {
      // Redirect the user to the login page
      window.location.replace("login.html");
    }
  }
});
