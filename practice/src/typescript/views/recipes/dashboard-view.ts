import { bindEvent } from "../../helpers";
import { EventHandler } from "../../helpers/type-dashboard";

export default class DashBoardView {
  private selectNewEl: HTMLElement;
  private formEl: HTMLElement;
  private selectCloseEl: HTMLElement;
  private selectEl: HTMLElement;
  private drawerEl: HTMLElement;

  constructor() {
    this.selectNewEl = document.querySelector(".btn__drawer") as HTMLElement;
    this.formEl = document.querySelector(".modal") as HTMLElement;
    this.selectCloseEl = document.querySelector(".modal__icon") as HTMLElement;
    this.selectEl = document.querySelector(
      ".navbar-user__icon-menu"
    ) as HTMLElement;
    this.drawerEl = document.querySelector(".drawer") as HTMLElement;
  }

  bindCallback = (event: string, handler: EventHandler): void => {
    switch (event) {
      case "newToggle":
        bindEvent(this.selectNewEl, "click", this.toggleForm);
        break;
      case "closeToggle":
        bindEvent(this.selectCloseEl, "click", this.toggleForm);
        break;
      case "menuToggle":
        bindEvent(this.selectEl, "click", this.menuToggle);
        break;
      default:
        break;
    }
  };

  /**
   * The toggleForm function changes the display state of a form on the user interface upon a click event
   * @param {Event} event - Click event object.
   */
  toggleForm = (event: Event): void => {
    event.preventDefault();
    if (this.formEl.classList.contains("show-form")) {
      this.formEl.classList.remove("show-form");
    } else {
      this.formEl.classList.add("show-form");
    }
  };

  /**
   * The menuToggle function changes the display state of the menu on the user interface when a click event occurs.
   * @param {MouseEvent} event - Click event object.
   */
  menuToggle = (event: Event): void => {
    event.preventDefault();
    if (this.drawerEl.classList.contains("show")) {
      this.drawerEl.classList.remove("show");
    } else {
      this.drawerEl.classList.add("show");
    }
  };
}
