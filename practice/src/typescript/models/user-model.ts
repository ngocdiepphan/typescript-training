export default class UserModel {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;

  constructor() {
    this.email = "";
    this.password = "";
    this.username = "";
    this.confirmPassword = "";
  }
}
