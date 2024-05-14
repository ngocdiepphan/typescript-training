import {
  renderUserTableTemplate,
  renderUserDetails,
} from "../../templates/user";
import { User } from "../../helpers/type-user";
import { bindEvent, delegate } from "../../helpers";

export default class UserView {
  private tableWrapperEl: HTMLElement;
  private userDetailsContainerEl: HTMLElement;
  private panelEl: HTMLElement;
  private tBodyEl: HTMLElement;

  constructor() {
    this.tableWrapperEl = document.getElementById(
      "table-wrapper"
    ) as HTMLElement;
    this.userDetailsContainerEl = document.querySelector(
      ".panel"
    ) as HTMLElement;
    this.panelEl = document.querySelector(".panel") as HTMLElement;
    this.tBodyEl = document.querySelector(".table__body") as HTMLElement;
  }

  bindCallback = (event: string, handler?: (userId: string) => void): void => {
    switch (event) {
      case "displayPanel":
        const selectPanelEl = document.getElementById("user-body");
        if (selectPanelEl) {
          bindEvent(selectPanelEl, "click", this.displayPanel);
        }
        break;
      case "userRowClick":
        this.tBodyEl = document.querySelector(".table__body") as HTMLElement;
        if (this.tBodyEl && handler) {
          delegate(
            this.tBodyEl,
            ".table__row",
            "click",
            this.showUserById(handler)
          );
        }
        break;
      default:
        break;
    }
  };

  /**
   * Renders the users data table in the user interface.
   * @param {User[]} data - An array containing user information.
   */
  renderTables = (data: User[]): void => {
    this.tableWrapperEl.innerHTML = renderUserTableTemplate(data);
  };

  /**
   * The displayPanel function displays or hides a panel on the user interface when a click event occurs.
   * @param event - Click event object.
   */
  displayPanel = (event: Event): void => {
    event.preventDefault();
    const detailPanel = document.getElementById("panel-details");
    if (detailPanel) {
      detailPanel.classList.toggle("show-panel");
      // this.bindCallback("saveUsers");
    }
  };

  /**
   * The showUserDetails function displays a user's details on the user interface.
   *
   * @param {object} userDetails - Object containing user details including id, username and email.
   */
  showUserDetails = ({
    id,
    username,
    email,
  }: {
    id: string;
    username: string;
    email: string;
  }): void => {
    this.panelEl.innerHTML = renderUserDetails({
      id,
      username,
      email,
    });
    this.userDetailsContainerEl.classList.add("show-panel");
    const btnBackEl = document.querySelector(".content-users") as HTMLElement;
    btnBackEl.addEventListener("click", () => {
      const detailPanel = document.querySelector(
        ".content-dashboard"
      ) as HTMLElement;
      detailPanel.classList.remove("show-panel");
    });
  };

  /**
   * The showUserById function handles the event when the user selects a user from the table and displays that user's details.
   * @param {function} handler - Function to handle when showUserById event is triggered.
   * @returns {function} - Event handler function.
   */
  showUserById =
    (handler: (userId: string) => void) =>
    (event: Event): void => {
      const target = event.target as HTMLElement;
      const userRow = target.closest(".table__row") as HTMLElement;

      if (userRow) {
        const userId = userRow.dataset.id;
        if (userId) {
          handler(userId);
        }
      }
    };
}
