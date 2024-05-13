import { Login } from "../../interfaces/LoginInterface";
import APIClient from "../APIClient";

export default class LoginService {
  private baseURI: string;

  constructor(baseURI: string) {
    this.baseURI = baseURI;
  }

  static init() {
    return new LoginService("/api/login-model");
  }

  login = async (login: Login) => {
    const loginInfo = {
      username: login.username,
      password: login.password,
    }

    const _post = await APIClient.post(`${this.baseURI}/login`, loginInfo);
    return _post;

  }

  findByUsername = async (username: string): Promise<any> => {
    const loginInfo = {
      username: username,
    }

    const _post = await APIClient.post(`${this.baseURI}/find-username`, loginInfo);
    return _post;

  }

  register = async (user: any) => {
    const newUser = {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      password: user.confirmPassword,
    }
    const _post = await APIClient.post(`${this.baseURI}/register`, newUser);
    return _post;
  }

  resetPassword = async (user: any): Promise<any> => {
    const userInfo = {
      username: user.username,
      password: user.password,
    }

    const __put = await APIClient.put(`${this.baseURI}/forgot-password`, userInfo)
    return __put;
  }
}
