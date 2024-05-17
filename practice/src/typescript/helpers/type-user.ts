export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
  role: string;
}

export interface EditUserHandler {
  userId: string;
  newUsername: string;
}

export type DeleteUserHandler = (userId: string) => void;

