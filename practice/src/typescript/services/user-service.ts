import { API } from "../constants/url";
import APIHelper from "./helper";
import { ApiResponse } from "./helper";
import { User } from "../helpers/type-user";

export default class UserService {
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
   * Fetches user data from the server.
   * @returns {Promise<ApiResponse>} - A promise containing the response data from the server.
   */
  static fetchUser = async (): Promise<ApiResponse> => {
    try {
      const res = await fetch(`${API.BASE_URL}${API.CREATE_USER}`);
      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
  };

  /**
   * Fetch method to edit user information on the server.
   * @param {string} userId - ID of the user to edit.
   * @param {UserPayload} payload - Object containing the user's new information.
   * @returns {Promise<ApiResponse>} - Promise resolved with the result of the fetch request.
   */
  static editUsers = async (
    userId: string,
    payload: User
  ): Promise<ApiResponse> => {
    try {
      const res = await fetch(`${API.BASE_URL}${API.CREATE_USER}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
  };

  /**
   * The deleteUser function sends a request to delete a user from the server.
   * @param {string} userId - The ID of the user to be deleted.
   * @param {object} payload - The optional payload data to be included in the request body.
   * @returns {Promise<object>} - A Promise that resolves to an object containing the response data or error information.
   */
  static deleteUser = async (
    userId: string,
    payload?: object
  ): Promise<object> => {
    try {
      const res = await fetch(`${API.BASE_URL}${API.CREATE_USER}/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
  };
}
