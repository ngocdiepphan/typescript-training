import UserModel from "../../models/user-model";
import AuthenticationView from "../../views/recipes/authentication-view";
import AuthenticationService from "../../services/authentication-service";
import { inValidEmail, inValidUsername, inValidPassword } from "../../helpers/index.ts";

export default class AuthenticationController {
  private userModel: UserModel;
  private authenticationView: AuthenticationView;

  constructor(userModel: UserModel, authenticationView: AuthenticationView) {
    this.userModel = userModel;
    this.authenticationView = authenticationView;
  }

  init = async (): Promise<void> => {
    this.authenticationView.bindCallback("signIn", this.handleSignIn);
    this.authenticationView.bindCallback("signUp", this.signUp)
  };

  handleSignIn = async (email: string, password: string): Promise<void> => {
    const user = await AuthenticationService.signIn(email, password);
    if (user !== 'Signed in failed!') {
      this.authenticationView.redirectPage("index.html");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  /**
 * The signUp function performs the new user registration process.
 * @param userData New user information including email, username, password, and passwordConfirm.
 */

  signUp = async (email: string, password?: string, username?: string, passwordConfirm?: string): Promise<void> => {
    const role = "user";

    if (!password || !passwordConfirm) {
      alert("Please enter both password and password confirmation.");
      return;
    }

    if (!inValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (username && !inValidUsername(username, 2)) {
      alert("Username must be at least 2 characters long.");
      return;
    }

    if (!inValidPassword(password, 8)) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (password !== passwordConfirm) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    const isExists = await AuthenticationService.findUserByEmail(email);
    if (isExists.result.length > 0) {
      alert("Email is already registered.");
      return;
    }

    const response = await AuthenticationService.createUser({
      email,
      username: username || '',
      password,
      passwordConfirm,
      role
    });

    if (!response.error) {
      this.authenticationView.redirectPage("login.html");
      alert("Sign Up successfully!")
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
  const { result } = await AuthenticationService.findUserByEmail(email);
  return !!result?.length;
};

/**
 * The signIn function performs user authentication using email address and password.
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if authentication is successful, false otherwise.
 */
signIn = async (email: string, password: string): Promise<boolean> => {
  const { result } = await AuthenticationService.signIn(email, password);
  return !!result?.length;
};
}
