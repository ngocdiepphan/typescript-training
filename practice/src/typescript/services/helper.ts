export interface ApiResponse {
  data:  Users[] | object | string | null;
  errMsg: string | null;
  result?: string;
  error?: { message: string };
}

interface Users {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  role: string;
}

export type SignInResponse = Users | string;

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
