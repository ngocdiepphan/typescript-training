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
  private sidebarDetailEl: HTMLElement;

  constructor() {
    this.tableWrapperEl = document.getElementById(
      "table-wrapper"
    ) as HTMLElement;
    this.userDetailsContainerEl = document.querySelector(
      ".panel"
    ) as HTMLElement;
    this.panelEl = document.querySelector(".panel") as HTMLElement;
    this.tBodyEl = document.querySelector(".table__body") as HTMLElement;
    this.sidebarDetailEl = document.getElementById(
      "panel-details"
    ) as HTMLElement;
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
      case "editUser":
        this.sidebarDetailEl = document.getElementById(
          "panel-details"
        ) as HTMLElement;
        if (this.sidebarDetailEl && handler) {
          delegate(
            this.sidebarDetailEl,
            ".btn-edit",
            "click",
            this.editUser(handler)
          );
        }
        break;
      case "deleteUser":
        this.sidebarDetailEl = document.getElementById("panel-details") as HTMLElement;
        if (this.sidebarDetailEl && handler) {
          delegate(
            this.sidebarDetailEl,
            ".btn-delete-user",
            "click",
            this.deleteUser(handler)
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
    }
  };

  /**
   * The handleRenderUserDetails function displays the user details in a panel on the user interface.
   * @param {object} params - An object containing the user's id, username, and email.
   * @param {string} params.id - The unique identifier of the user.
   * @param {string} params.username - The username of the user.
   * @param {string} params.email - The email address of the user.
   */
  handleRenderUserDetails = ({
    id,
    username,
    email,
  }: User): void => {
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
   * @param {function} handler - Function to handle when showUserById event is triggered. It takes a userId (string) as its argument and returns void.
   * @param {(userId: string) => void} handler - A function that will be called with the user's ID.
   * @returns {(event: Event) => void} - A new function that can be called when a user row is clicked.
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

  /**
   * The editUser function handles the event when the user edits a user's details and triggers the appropriate handler.
   * @param {(userId: string, userName: string) => void} handler - A function that will be called with the user's ID and name.
   * @returns {(event: Event) => void} - A new function that can be called to initiate the user editing process.
   */
  editUser =
    (handler: (userId: string, userName: string) => void) =>
    (event: Event): void => {
      const userName = (
        document.getElementById("name-input") as HTMLInputElement
      ).value.trim();
      const userId =
        (document.querySelector(".panel__confirm") as HTMLElement).getAttribute(
          "data-id"
        ) || "";
      handler(userId, userName);
    };

  /**
   * The deleteUser function retrieves the user ID from the confirmation panel and invokes a handler function to delete the user.
   * @param {function} handler - The handler function to be invoked with the user ID.
   */
  deleteUser = (handler: (userId: string) => void) => (event: Event) => {
    const userId =
      document.querySelector(".panel__confirm")?.getAttribute("data-id") || "";
    handler(userId);
  };
}
