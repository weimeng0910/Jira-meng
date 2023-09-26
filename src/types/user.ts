export interface User {
  id: number;
  name: string;
  personId: number;
  email: string;
  title: string;
  organization: string;
  token: string;
}
export interface AuthForm {
  username: string;
  password: string;
}
export interface UserData {
  id: string,
  username: string,
  passwordHash: string,
  token?: string | ''
}
