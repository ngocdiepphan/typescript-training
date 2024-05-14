import { API } from "../constants/url";
import APIHelper from "./helper";
import { ApiResponse, SignInResponse } from "./helper";

export default class UserService {
  /**
   * Handles the response from a fetch request.
   * @param {Response} res - The response object from the fetch request.
   * @returns {Promise<ApiResponse>} - A promise containing the response data or error message.
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
   * Handles an error encountered during an API request.
   * @param {Error} err - The error object.
   * @returns {{ data: null; errMsg: string }} - An object containing the error message.
   */
  static handleError = (err: Error): { data: null; errMsg: string } => {
    return {
      data: null,
      errMsg: err.message,
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
}
