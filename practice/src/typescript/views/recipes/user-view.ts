import { renderUserTableTemplate } from "../../templates/user";
import { User } from "../../models/user-model";

export default class UserView {
  private tableWrapperEl: HTMLElement;

  constructor() {
    this.tableWrapperEl = document.getElementById(
      "table-wrapper"
    ) as HTMLElement;
  }

  /**
   * Renders the users data table in the user interface.
   * @param {User[]} data - An array containing user information.
   */
  renderTables = (data: User[]): void => {
    this.tableWrapperEl.innerHTML = renderUserTableTemplate(data);
  };
}
