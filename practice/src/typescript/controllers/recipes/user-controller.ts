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

  handleViewUsers = async (): Promise<void> => {
    const { data } = await this.getUser();
      this.userModel.setUser(data);
      this.userView.renderTables(data);
  };

  /**
   * The getUser function retrieves a list of User from the server through UserService.
   * @returns {Promise<Array<object>>} - A Promise containing user list data from the server.
   */
  getUser = async (): Promise<ApiResponse> => {
    return await UserService.fetchUser();
  };
}
