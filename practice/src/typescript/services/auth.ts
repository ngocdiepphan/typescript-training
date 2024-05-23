import { API } from "../constants/url";
import APIHelper from "./helper";
import { ApiResponse } from "./helper";
import { User } from "../types/user";

export default class AuthenticationService {
  /**
   * Handles the response from an API request by returning an ApiResponse object with response data or error details.
   * @param {Response} res - The response object from the API request.
   * @returns {Promise<ApiResponse>} - A Promise containing an ApiResponse object with response data or error details.
   */
  static handleResponse = async (res: Response): Promise<ApiResponse> => {
    if (res.ok) {
      const data = await res.json();
      return {
        data,
        error: null,
      };
    } else {
      return {
        data: null,
        error: { message: res.statusText },
      };
    }
  };

  /**
   * Handles errors by returning an ApiResponse object with error details.
   * @param {Error} err - The error object.
   * @returns {ApiResponse} - An object containing error details.
   */
  static handleError = (err: Error): ApiResponse => {
    return {
      data: null,
      error: { message: err.message },
    };
  };

  /**
   * Signs in a user with the provided email and password.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<SignInResponse>} - A promise containing the signed-in user data or an error message.
   */
  static signIn = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      const response = await APIHelper.createRequest(
        `${API.BASE_URL}${API.CREATE_USER}?email=${email}&password=${password}`,
        "GET",
        null
      );

      if ("error" in response) {
        return null;
      }

      const users = response.data;
      const user = users.find(
        (user: User) => user.email === email && user.password === password
      );

      return user || null;
    } catch (error) {
      return null;
    }
  };

  /**
   * Creates a new user.
   * @param {Object} userData - User data object containing email, username, password, passwordConfirm, and role.
   * @param {string} userData.email - The email of the user.
   * @param {string} [userData.username] - The username of the user (optional).
   * @param {string} userData.password - The password of the user.
   * @param {string} userData.passwordConfirm - The confirmation password of the user.
   * @param {string} userData.role - The role of the user.
   * @returns {Promise<ApiResponse>} - A promise containing the response data or an error.
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
  }): Promise<ApiResponse> => {
    const encodedPassword = btoa(password);
    const encodedConfirmPassword = btoa(passwordConfirm);

    const response = await APIHelper.createRequest(
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

    if ("error" in response) {
      return {
        data: null,
        error: { message: response.error.message },
      };
    } else {
      return {
        data: response.result,
        error: null,
      };
    }
  };

  /**
   * Finds a user by email.
   * @param {string} email - The email of the user to find.
   * @returns {Promise<ApiResponse>} - A promise containing the response data or an error.
   */
  static findUserByEmail = async (email: string): Promise<ApiResponse> => {
    const response = await APIHelper.createRequest(
      `${API.BASE_URL}${API.CREATE_USER}?email=${email}`,
      "GET",
      null
    );

    if ("error" in response) {
      return {
        data: null,
        error: { message: response.error.message },
      };
    } else {
      return {
        data: response.result,
        error: null,
      };
    }
  };
}
