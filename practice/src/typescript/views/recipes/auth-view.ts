import { bindEvent } from  "../../helpers";

export default class AuthView {
  private signInFormEl: HTMLElement | null;
  private signUpFormEl: HTMLElement | null;

  constructor() {
    this.signInFormEl = document.getElementById("form-sign-in");
    this.signUpFormEl = document.getElementById("form-sign-up");
  }

  bindCallback = (event: string,  handler: (email: string, password: string, username?: string, passwordConfirm?: string) => void): void => {
    switch (event) {
      case "signIn":
        bindEvent(this.signInFormEl, "submit", this.signIn(handler));
        break;
      case "signUp":
        bindEvent(this.signUpFormEl, "submit", this.signUp(handler));
      default:
        break;
    }
  };

  signIn = (handler: (email: string, password: string) => void): ((event: Event) => void) => {
    return (event: Event): void => {
      event.preventDefault();
      const emailEl: HTMLInputElement = document.getElementById("email") as HTMLInputElement;
      const passwordEl: HTMLInputElement = document.getElementById("password") as HTMLInputElement;
      handler(emailEl.value, passwordEl.value);
    };
  };

  redirectPage = (page: string): void => {
    window.location.replace(page);
  };

  signUp = (handler: (email: string, password: string, username: string, passwordConfirm: string) => void): ((event: Event) => void) => {
    return (event: Event): void => {
      event.preventDefault();
      const emailEl: HTMLInputElement = document.getElementById("email") as HTMLInputElement;
      const passwordEl: HTMLInputElement = document.getElementById("password") as HTMLInputElement;
      const userNameEl: HTMLInputElement = document.getElementById("username") as HTMLInputElement;
      const passwordConfirmEl: HTMLInputElement = document.getElementById("confirmPassword") as HTMLInputElement;
      handler(emailEl.value, passwordEl.value, userNameEl.value, passwordConfirmEl.value);
    };
  }
}
