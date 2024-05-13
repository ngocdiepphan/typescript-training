export interface ApiResponse {
  data: User[] | null;
  error?: { message: string } | null;
}

export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
  role: string;
}

export type SignInResponse = User | string;

export interface RecipeApiResponse {
  data: Recipe | null;
  error?: { message: string } | null;
}

export interface Recipe {
  name: string;
  description: string;
  ingredient: string[];
  instruction: string;
  nutrition: string;
  creator: string;
  category: string;
  id: string;
  role: string;
  imageURL: string;
  ratings: number;
  createdAt: Date;
}

export default class APIHelper {
  /**
   * Method for creating and sending a fetch request to a specified URL.
   *
   * @param {string} url - URL of the fetch request.
   * @param {string} method - The method of the fetch request (GET, POST, PUT, DELETE, etc.).
   * @param {object} data - The data to be sent (if any).
   * @param {string} contentType - Content type of the fetch request (default is "application/json").
   * @returns {Promise} - Promise resolved with the result of the fetch request.
   */
  static createRequest = async (
    url: string,
    method: string,
    data: object | null,
    contentType: string = "application/json"
  ): Promise<{ response: Response; result: any } | { error: Error }> => {
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

      return { response, result };
    } catch (error) {
      return { error };
    }
  };
}
