import UserModel from "../../models/user-model.ts";
import authView from "../../views/recipes/auth-view.ts";
import AuthService from "../../services/auth-service.ts";

export default class AuthController {
  private userModel: UserModel;
  private authView: authView;

  constructor(userModel: UserModel, authView: authView) {
    this.userModel = userModel;
    this.authView = authView;
  }

  init = async (): Promise<void> => {
    this.authView.bindCallback("signIn", this.handleSignIn);
    this.authView.bindCallback("signUp", this.signUp);
  };

  /**
   * Handles the sign-in process for a user.
   * @param {string} email The email address of the user.
   * @param {string} password The password of the user.
   * @returns {Promise<void>} A Promise that resolves when the sign-in process is complete.
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
   * signUp performs user registration.
   * @param email The email address of the new user.
   * @param password The password of the new user.
   * @param username The username of the new user.
   * @param passwordConfirm The password confirmation of the new user.
   * @returns A Promise<void> representing the registration process.
   */
  signUp = async (
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
    if (isExists && isExists.result && isExists.result.length > 0) {
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
   * The findUserByEmail function checks whether an email address exists in the system or not.
   * @param email Email address to check.
   * @returns Returns true if the email address already exists in the system, otherwise returns false.
   */
  findUserByEmail = async (email: string): Promise<boolean> => {
    const { result } = await AuthService.findUserByEmail(email);
    return !!result?.length;
  };

  /**
   * The signIn function performs user authentication using email address and password.
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   * @returns {Promise<boolean>} - Returns a promise that resolves to true if authentication is successful, false otherwise.
   */
  signIn = async (email: string, password: string): Promise<boolean> => {
    const response = await AuthService.signIn(email, password);

    if (typeof response === "string") {
      return false;
    }

    return !!response;
  };
}
