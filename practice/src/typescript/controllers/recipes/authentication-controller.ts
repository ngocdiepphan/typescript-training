import UserModel from "../../models/user-model";
import AuthenticationView from "../../views/recipes/authentication-view";
import AuthenticationService from "../../services/authentication-service";

export default class AuthenticationController {
  private userModel: UserModel;
  private authenticationView: AuthenticationView;

  constructor(userModel: UserModel, authenticationView: AuthenticationView) {
    this.userModel = userModel;
    this.authenticationView = authenticationView;
  }

  init = async (): Promise<void> => {
    this.authenticationView.bindCallback("signIn", this.handleSignIn);
    console.log("controller");
  };

  handleSignIn = async (email: string, password: string): Promise<void> => {
    const user = await AuthenticationService.signIn(email, password);
    if (user !== 'Signed in failed!') {
      this.authenticationView.redirectPage("index.html");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };
}
