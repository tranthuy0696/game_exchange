import {Role} from "./role";

export class User {
  username: string;
  userName: string;
  password: string;
  fullName: string;
  email: string;
  image: string;
  pathImages: string;
  defaultLanguage: string;
  authorities: Role[] = [];


  setUsername(username: string): User {
    this.username = username;
    return this;
  }

  setPassword(password: string): User {
    this.password = password;
    return this;
  }
}
