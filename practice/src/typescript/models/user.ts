import { User } from "../types/user";

export default class UserModel {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
  private users: User[];

  constructor() {
    this.email = "";
    this.password = "";
    this.username = "";
    this.confirmPassword = "";
    this.users = [];
  }

  /**
   * The setUser function updates user data in the application model.
   * @param {Array<User>} data - An array containing user data
   */
  setUser = (data: User[]): void => {
    this.users = data;
  };

  // /**
  //  * The getUserById function gets information about a user based on their ID from the user data in the application model.
  //  * @param {string} id - ID of the user to get information from.
  //  * @returns {User|undefined} - Returns information about the user with the corresponding ID, or undefined if not found.
  //  */
  getUserById = (id: string) => {
    return this.users.find((user) => user.id === id);
  };
}
