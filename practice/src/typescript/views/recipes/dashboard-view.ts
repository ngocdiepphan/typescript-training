import { bindEvent } from "../../helpers";
import { EventHandler } from "../../helpers/type-dashboard";

export default class DashBoardView {
  private selectNewEl: HTMLElement;
  private formEl: HTMLElement;

  constructor() {
    this.selectNewEl = document.querySelector(".btn__drawer") as HTMLElement;
    this.formEl = document.querySelector(".modal") as HTMLElement;
  }

  bindCallback = (event: string, handler: EventHandler): void => {
    switch (event) {
      case "newToggle":
        bindEvent(this.selectNewEl, "click", this.newToggle);
        break;
      default:
        break;
    }
  };

  /**
   * The newToggle function changes the display state of a form on the user interface upon a click event
   * @param {Event} event - Click event object.
   */
  newToggle = (event: Event): void => {
    event.preventDefault();
    if (this.formEl.classList.contains("show-form")) {
      this.formEl.classList.remove("show-form");
    } else {
      this.formEl.classList.add("show-form");
    }
  };
}
