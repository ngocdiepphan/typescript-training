import UserView from "../../views/recipes/user-view";
import UserModel from "../../models/user-model.ts";
import UserService from "../../services/user-service.ts";
import { ApiResponse } from "../../services/helper.ts"
import { User } from "../../models/user-model.ts"

export default class UserController {
  private userModel: UserModel;
  private userView: UserView;

  constructor(userModel: UserModel, userView: UserView) {
    this.userModel = userModel;
    this.userView = userView;
  }

  init = async (): Promise<void> => {

  }

  handleViewUsers = async (): Promise<void> => {
    const { data } = await this.getUsers();
    this.userModel.setUsers(data);
    this.userView.renderTables(data);
  };

/**
 * The getUsers function retrieves a list of users from the server through UserService.
 * @returns {Promise<Array<object>>} - A Promise containing user list data from the server.
 */
getUsers = async (): Promise<ApiResponse> => {
  return await UserService.fetchUsers();
};


}
