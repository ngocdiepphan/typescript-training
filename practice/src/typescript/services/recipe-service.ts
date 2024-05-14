import { API } from "../constants/url";
import APIHelper from "./helper";
import { RecipeApiResponse } from "./helper";

export default class RecipeService {
  /**
   * Fetches recipes from the server.
   * @returns {Promise<RecipeApiResponse>} - A promise containing the response data and error information.
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
   * Handles the response from a fetch request for recipes.
   * @param {Response} res - The response object from the fetch request.
   * @returns {Promise<RecipeApiResponse>} - A promise containing the response data and error information.
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

  /**
   * Handles errors that occur during a fetch request.
   * @param {Error} err - The error object.
   * @returns {{ data: null; errMsg: string }} - An object containing null data and the error message.
   */
  static handleError = (err: Error): { data: null; errMsg: string } => {
    return {
      data: null,
      errMsg: err.message,
    };
  };
}
