import { Recipe } from "../types/recipe";
import { User } from "../types/user";

export interface ApiResponse {
  data: User[] | null;
  error?: { message: string } | null;
}

export type SignInResponse = User | string;

export interface RecipeApiResponse {
  data: Recipe[] | null;
  error?: { message: string } | null;
}

export default class APIHelper {
  /**
   * Creates a request to the server.
   * @param {string} url - The URL to which the request is made.
   * @param {string} method - The HTTP method for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE').
   * @param {object | null} data - The data to be sent with the request body (optional).
   * @param {string} contentType - The content type of the request (default is 'application/json').
   * @returns {Promise<{ response: Response; result: any } | { error: Error }>} - A promise containing either the response and result, or an error.
   */
  static createRequest = async (
    url: string,
    method: string,
    data: object | null,
    contentType: string = "application/json"
  ): Promise<
    { response: Response; data: any; result: any } | { error: Error }
  > => {
    try {
      let content: RequestInit = {
        method,
        headers: {
          "Content-Type": contentType,
        },
      };

      if (data) {
        content.body = JSON.stringify(data);
      }

      const response = await fetch(url, content);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();

      return { response, data: result, result };
    } catch (error) {
      return { error };
    }
  };
}
