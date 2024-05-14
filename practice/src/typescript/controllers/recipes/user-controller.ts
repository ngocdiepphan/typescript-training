import UserView from "../../views/recipes/user-view";
import UserModel from "../../models/user-model.ts";
import UserService from "../../services/user-service.ts";
import { ApiResponse } from "../../services/helper.ts";

export default class UserController {
  private userModel: UserModel;
  private userView: UserView;

  constructor(userModel: UserModel, userView: UserView) {
    this.userModel = userModel;
    this.userView = userView;
  }

  init = async (): Promise<void> => {
    this.userView.bindCallback("editUser", this.handleEditUser);
    this.userView.bindCallback("deleteUser", this.handleDeleteUser);
  };

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
   * The handleEditUser function is responsible for updating the username of a user.
   * @param {string} userId - The ID of the user to be updated.
   * @param {string} newUsername - The new username to be set for the user.
   * @returns {Promise<void>} - A Promise that resolves when the user update is complete.
   */
  handleEditUser = async (
    userId: string,
    newUsername: string
  ): Promise<void> => {
    try {
      if (!newUsername) {
        alert("Username cannot be empty!");
        return;
      }
      const user = this.userModel.getUserById(userId);
      if (!user) {
        alert("User not found!");
        return;
      }
      await UserService.editUsers(userId, { ...user, username: newUsername });
      alert("Username updated successfully!");
      this.handleViewUsers();
    } catch (error) {
      alert("Failed to update user");
    }
  };

  /**
 * The handleDeleteUser function initiates the deletion of a user from the server and updates the UI accordingly.
 * @param {string} userId - The ID of the user to be deleted.
 */
handleDeleteUser = async (userId: string): Promise<void> => {
  try {
    const user = this.userModel.getUserById(userId);
    if (!user) {
      alert("User not found!");
      return;
    }

    await UserService.deleteUser(userId, { ...user });
    alert("User deleted successfully!");
    this.handleViewUsers();
  } catch (error) {
    alert("Failed to delete user");
  }
};


  /**
   * Fetches user data from the server through the UserService.
   * @returns {Promise<ApiResponse>} - A Promise containing user data from the server.
   */
  getUser = async (): Promise<ApiResponse> => {
    return await UserService.fetchUser();
  };
}
