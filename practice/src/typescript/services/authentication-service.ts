import { API } from "../constants/url";
import APIHelper from "./helper";

export default class AuthenticationService {
  /**
   * Handle API response
   * @param {Response} res The response object from the API
   * @returns {Promise<object>} An object containing the response users or error message
   */
  static handleResponse = async (
    res: Response
  ): Promise<{ data: any; errMsg: string | null }> => {
    if (res.ok) {
      const data = await res.json();
      return {
        data,
        errMsg: null,
      };
    } else {
      return {
        data: null,
        errMsg: res.statusText,
      };
    }
  };

  /**
   * The handleError static method handles errors by returning an object with error details.
   * @param {Error} err - The error object.
   * @returns {object} - An object containing error details.
   * @property {any} data - Data associated with the error (null in this case).
   * @property {string} errMsg - Error message from the error object.
   */
  static handleError = (err: Error): { data: any; errMsg: string } => {
    return {
      data: null,
      errMsg: err.message,
    };
  };

  /**
   * User login method using email address and password on the server.
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   * @returns {Promise<any>} - Promise resolved with the result of the user login request.
   */
  static signIn = async (email: string, password: string): Promise<any> => {
    const response = await APIHelper.createRequest(
      `${API.BASE_URL}${API.CREATE_USER}?email=${email}&password=${password}`,
      "GET",
      null
    );

    if ("error" in response) {
      return "Signed in failed!";
    }
    const users = response.result;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
        return users[i];
      }
    }
    return "Signed in failed!";
  };

  /**
   * Creates a new user on the server.
   * @param {object} userData - An object containing the new user's information.
   * @param {string} userData.email - The email address of the new user.
   * @param {string} [userData.username] - The username of the new user (optional).
   * @param {string} userData.password - The password of the new user.
   * @param {string} userData.passwordConfirm - The confirmation password entered by the user.
   * @param {string} userData.role - The role of the new user (e.g., "user", "admin").
   * @returns {Promise<any>} - A Promise that resolves with the result of the new user request.
   */
  static createUser = async ({
    email,
    username,
    password,
    passwordConfirm,
    role,
  }: {
    email: string;
    username?: string;
    password: string;
    passwordConfirm: string;
    role: string;
  }): Promise<any> => {
    const encodedPassword = btoa(password);
    const encodedConfirmPassword = btoa(passwordConfirm);

    return await APIHelper.createRequest(
      `${API.BASE_URL}${API.CREATE_USER}`,
      "POST",
      {
        email,
        username,
        password: encodedPassword,
        passwordConfirm: encodedConfirmPassword,
        role,
      }
    );
  };

  /**
   * Searches for a user by email address on the server.
   * @param {string} email - The email address of the user to search for.
   * @returns {Promise<any>} - A Promise that resolves with the results of the user search request.
   */
  static findUserByEmail = async (email: string): Promise<any> => {
    // Send a request to search for a user by email address
    return await APIHelper.createRequest(
      `${API.BASE_URL}${API.CREATE_USER}?email=${email}`,
      "GET",
      null
    );
  };
}
