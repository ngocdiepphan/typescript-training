import UserView from "../../views/recipes/user-view";
import UserModel from "../../models/user-model.ts";
import UserService from "../../services/user-service.ts";
import { ApiResponse } from "../../services/helper.ts";

export default class UserController {
  private userModel: UserModel;
  private userView: UserView;
  private urlParams: URLSearchParams;

  constructor(userModel: UserModel, userView: UserView) {
    this.userModel = userModel;
    this.userView = userView;
    this.urlParams = new URLSearchParams(window.location.search);
  }

  init = async (): Promise<void> => {};

  /**
   * Handles the view of users by fetching user data, setting users in the model, and rendering the user table in the view.
   * @returns {Promise<void>} - A Promise that resolves once the view of users is handled.
   */
  handleViewUsers = async (): Promise<void> => {
    const { data } = await this.getUser();
    this.userModel.setUser(data);
    this.userView.renderTables(data);
    this.userView.bindCallback("userRowClick", this.handleShowUserDetails);
  };

  /**
   * The handleShowUserDetails function displays details of a user.
   * @param {string} userId - ID of the user to display details.
   */
  handleShowUserDetails = (userId: string): void => {
    const user = this.userModel.getUserById(userId);
    this.userView.showUserDetails(user);
  };

  /**
   * Fetches user data from the server through the UserService.
   * @returns {Promise<ApiResponse>} - A Promise containing user data from the server.
   */
  getUser = async (): Promise<ApiResponse> => {
    return await UserService.fetchUser();
  };
}
