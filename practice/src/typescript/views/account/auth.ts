import { bindEvent } from "../../helpers/index.ts";
import {
  inValidEmail,
  inValidUsername,
  inValidPassword,
} from "../../helpers/index.ts";

export default class AuthView {
  private signInFormEl: HTMLElement | null;
  private signUpFormEl: HTMLElement | null;

  constructor() {
    this.signInFormEl = document.getElementById("form-sign-in");
    this.signUpFormEl = document.getElementById("form-sign-up");
  }

  bindCallback = (
    event: string,
    handler: (
      email: string,
      password: string,
      username?: string,
      passwordConfirm?: string
    ) => void
  ): void => {
    switch (event) {
      case "signIn":
        bindEvent(this.signInFormEl, "submit", this.signIn(handler));
        break;
      case "signUp":
        bindEvent(this.signUpFormEl, "submit", this.signUp(handler));
        break;
      default:
        break;
    }
  };

  /**
   * Attaches an event handler for the sign-in process.
   * @param {function} handler - Function to handle the sign-in process.
   * @returns {function} - Event handler for the sign-in process.
   */
  signIn = (
    handler: (email: string, password: string) => void
  ): ((event: Event) => void) => {
    return (event: Event): void => {
      event.preventDefault();
      const emailEl: HTMLInputElement = document.getElementById(
        "email"
      ) as HTMLInputElement;
      const passwordEl: HTMLInputElement = document.getElementById(
        "password"
      ) as HTMLInputElement;
      handler(emailEl.value, passwordEl.value);
    };
  };

  /**
   * Redirects the user to the specified page.
   * @param {string} page - The page to redirect to.
   */
  redirectPage = (page: string): void => {
    window.location.replace(page);
  };

  /**
   * Creates a callback function to handle the sign-up form submission.
   * Validates form input fields and invokes the provided handler with the input values.
   *  @param {Function} handler - Function to handle the sign-up process.
   * @returns {Function} - Event handler for the sign-up process.
   */
  signUp = (
    handler: (
      email: string,
      password: string,
      username: string,
      passwordConfirm: string
    ) => void
  ): ((event: Event) => void) => {
    return (event: Event): void => {
      event.preventDefault();

       // Get the input elements by their IDs
      const emailEl: HTMLInputElement = document.getElementById(
        "email"
      ) as HTMLInputElement;
      const passwordEl: HTMLInputElement = document.getElementById(
        "password"
      ) as HTMLInputElement;
      const userNameEl: HTMLInputElement = document.getElementById(
        "username"
      ) as HTMLInputElement;
      const passwordConfirmEl: HTMLInputElement = document.getElementById(
        "confirmPassword"
      ) as HTMLInputElement;

      const email = emailEl.value.trim();
      const password = passwordEl.value.trim();
      const username = userNameEl.value.trim();
      const passwordConfirm = passwordConfirmEl.value.trim();

       // Validate the email address format
      if (!inValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Validate the username length (must be at least 2 characters)
      if (username && !inValidUsername(username, 2)) {
        alert("Username must be at least 2 characters long.");
        return;
      }

      // Validate the password length (must be at least 8 characters)
      if (inValidPassword(password, 8)) {
        alert("Password must be at least 8 characters long.");
        return;
      }

       // Check if the password and password confirmation match
      if (password !== passwordConfirm) {
        alert("Password and Confirm Password do not match.");
        return;
      }

      // Call the handler function with the validated inputs
      handler(email, password, username, passwordConfirm);
    };
  };
}
