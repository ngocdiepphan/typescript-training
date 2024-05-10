import { renderUserTableTemplate } from "../../templates/user"

export default class UserView {
  private tableWrapperEl: HTMLElement;

  constructor() {
    this.tableWrapperEl = document.getElementById("table-wrapper") as HTMLElement;
  }
/**
 * The renderTables function renders the user data table to the user interface.
 * @param {Array<User>} users - Array containing user information.
 */
renderTables = (): void => {
  this.tableWrapperEl.innerHTML = this.renderUserTableTemplate(users);
};

}
