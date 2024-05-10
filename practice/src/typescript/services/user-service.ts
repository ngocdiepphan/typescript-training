import { API } from "../constants/url";
import APIHelper from "./helper";
import { ApiResponse, SignInResponse }  from "./helper";

// interface ApiResponse {
//   data: User[] | string | null;
//   errMsg: string | null;
//   result?: string;
//   error?: { message: string };
// }
// interface User {
//   email: string;
//   username: string;
//   password: string;
//   passwordConfirm: string;
//   role: string;
// }
// type SignInResponse = User | string;

export default class UserService {
    /**
     * Handle API response
     * @param {Response} res The response object from the API
     * @returns {Promise<object>} An object containing the response users or error message
     */
    static handleResponse = async (res: Response): Promise<ApiResponse> => {
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
     * Handle API errors.
     * @param {Error} err The error object.
     * @returns {object} An object containing error details.
     * @property {null} data Data associated with the error (null in this case).
     * @property {string} errMsg Error message from the error object.
     */
    static handleError = (err: Error): { data: null; errMsg: string } => {
      return {
        data: null,
        errMsg: err.message,
      };
    };

    static fetchUsers = async (): Promise<ApiResponse> => {
      try {
        const res = await fetch(`${API.BASE_URL}${API.CREATE_USER}`);
        return this.handleResponse(res);
      } catch (err) {
        return this.handleError(err);
      }
    };
}
