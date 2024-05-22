export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
  role: string;
}

export type EditUserHandler = (userId: string, userName: string) => void;

export type DeleteUserHandler = (userId: string) => void;

