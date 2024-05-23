import UserModel from "../../models/user-model.ts";
import AuthView from "../../views/recipes/auth-view.ts";
import AuthService from "../../services/auth-service.ts";

export default class AuthController {
  private userModel: UserModel;
  private authView: AuthView;

  constructor(userModel: UserModel, authView: AuthView) {
    this.userModel = userModel;
    this.authView = authView;
  }

  init = async (): Promise<void> => {
    this.authView.bindCallback("signIn", this.handleSignIn);
    this.authView.bindCallback("signUp", this.handleSignUp);
  };

  /**
   * Handles the sign-in process by calling the signIn method from the AuthService and processing the returned user data.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<void>} - A Promise indicating the completion of the sign-in process.
   */
  handleSignIn = async (email: string, password: string): Promise<void> => {
    const user = await AuthService.signIn(email, password);


    if (typeof user === "object" && user !== null) {
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        this.authView.redirectPage("dashboard.html");
      } else if (user.role === "user") {
        this.authView.redirectPage("index.html");
      }
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  /**
   * Handles the sign-up process by calling the createUser method from the AuthService and processing the returned response.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @param {string} username - The user's username (optional).
   * @param {string} passwordConfirm - The confirmation of the user's password (optional).
   * @returns {Promise<void>} - A Promise indicating the completion of the sign-up process.
   */
  handleSignUp = async (
    email: string,
    password?: string,
    username?: string,
    passwordConfirm?: string
  ): Promise<void> => {
    const role = "user";
    if (!password || !passwordConfirm) {
      alert("Please enter both password and password confirmation.");
      return;
    }

    const isExists = await AuthService.findUserByEmail(email);
    if (isExists.data && isExists.data.length > 0) {
      alert("Email is already registered.");
      return;
    }

    const response = await AuthService.createUser({
      email,
      username: username || "",
      password,
      passwordConfirm,
      role,
    });

    if (!response.error) {
      this.authView.redirectPage("login.html");
      alert("Sign Up successfully!");
    } else {
      alert("Something went wrong!");
    }
  };

  /**
   * Handles the sign-in process by calling the signIn method from the AuthService and processing the returned response.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<boolean>} - A Promise indicating whether the sign-in was successful.
   */
  signIn = async (email: string, password: string): Promise<boolean> => {
    const response = await AuthService.signIn(email, password);

    if (typeof response === "string") {
      return false;
    }

    return !!response;
  };
}
