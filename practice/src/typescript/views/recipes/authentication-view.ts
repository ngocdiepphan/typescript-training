
import { bindEvent } from  "../../helpers"

export default class AuthenticationView {
  private signInFormEl: HTMLElement | null;

  constructor() {
    this.signInFormEl = document.getElementById("form-sign-in");
    console.log("view, constructor");
  }

  bindCallback = (event: string,  handler: (email: string, password: string) => void): void => {
    switch (event) {
      case "signIn":
        console.log("view, bind");
        bindEvent(this.signInFormEl, "submit", this.signIn(handler));
        break;
      default:
        break;
    }
  };

  signIn = (handler: (email: string, password: string) => void): ((event: Event) => void) => {
    return (event: Event): void => {
      console.log("view, signIn");
      event.preventDefault();
      const emailEl: HTMLInputElement = document.getElementById("email") as HTMLInputElement;
      const passwordEl: HTMLInputElement = document.getElementById("password") as HTMLInputElement;
      handler(emailEl.value, passwordEl.value);
    };
  };

  redirectPage = (page: string): void => {
    window.location.replace(page);
  };
}
