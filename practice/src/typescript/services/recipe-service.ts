import { API } from "../constants/url";
import APIHelper from "./helper";
import { RecipeApiResponse } from "./helper";

export default class RecipeService {
  /**
   * Fetch method to get recipe list from the server.
   * @returns {Promise<ApiResponse>} - Promise resolved with the result of the fetch request.
   */
  static fetchRecipes = async (): Promise<RecipeApiResponse> => {
    try {
      const res = await fetch(`${API.BASE_URL}${API.CREATE_PRODUCT}`);
      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
  };

  /**
   * Handle API response
   * @param {Response} res The response object from the API
   * @returns {ApiResponse} An object containing the response users or error message
   */
  static handleResponse = async (res: Response): Promise<RecipeApiResponse> => {
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

  static handleError = (err: Error): { data: null; errMsg: string } => {
    return {
      data: null,
      errMsg: err.message,
    };
  };
}
