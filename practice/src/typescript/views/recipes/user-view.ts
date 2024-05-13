import { renderUserTableTemplate } from "../../templates/user";
import { User } from "../../models/user-model";

export default class UserView {
  private tableWrapperEl: HTMLElement;

  constructor() {
    this.tableWrapperEl = document.getElementById("table-wrapper") as HTMLElement;
  }

  renderTables = (data: User[]): void => {
    this.tableWrapperEl.innerHTML = renderUserTableTemplate(data);
  };
}
