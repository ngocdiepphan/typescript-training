import { API } from "../constants/url";
import APIHelper from "./helper";
import { RecipeApiResponse } from "./helper";

export default class RecipeService {
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
   * The editRecipe static method updates an existing recipe with the provided payload.
   * @param {string} recipeId - The ID of the recipe to be updated.
   * @param {object} payload - The payload containing updated recipe details.
   * @returns {Promise<object>} - A Promise resolving to the response object.
   */
  static editRecipe = async (
    recipeId: string,
    payload: any
  ): Promise<object> => {
    try {
      const res = await fetch(
        `${API.BASE_URL}${API.CREATE_PRODUCT}/${recipeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
  };

  /**
   * The deleteRecipe static method deletes a recipe with the specified recipeId.
   * @param {string} recipeId - The ID of the recipe to be deleted.
   * @returns {Promise<object>} - A Promise resolving to the response object.
   */
  static deleteRecipe = async (recipeId: string): Promise<object> => {
    try {
      const res = await fetch(
        `${API.BASE_URL}${API.CREATE_PRODUCT}/${recipeId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
  };

  /**
   * Fetch method to create a new recipe on the server.
   * @param {object} recipeInfo - Object containing information about the new recipe.
   * @param {string} recipeInfo.name - Name of the new recipe.
   * @param {string} recipeInfo.image - Image URL of the new recipe.
   * @param {string} recipeInfo.category - Category of the new recipe.
   * @param {string} recipeInfo.creator - Creator of the new recipe.
   * @param {number} recipeInfo.ratings - Ratings of the new recipe.
   * @param {string} recipeInfo.description - Description of the new recipe.
   * @param {string} recipeInfo.createdAt - Creation date of the new recipe.
   * @returns {Promise<any>} - Promise resolved with the result of the fetch request.
   */
  static createRecipe = async ({
    name,
    image,
    category,
    creator,
    ratings,
    description,
    createdAt,
  }: {
    name: string;
    image: string;
    category: string;
    creator: string;
    ratings: number;
    description: string;
    createdAt: string;
  }): Promise<any> => {
    return await APIHelper.createRequest(
      `${API.BASE_URL}${API.CREATE_PRODUCT}`,
      "POST",
      {
        name,
        imageURL: image,
        category,
        creator,
        ratings,
        description,
        createdAt,
      }
    );
  };
}
