import { User } from "interfaces/UserInterface";
import APIClient from "api/APIClient";


export default class UserService {
  private baseURI: string;

  constructor(baseURI: string) {
    this.baseURI = baseURI;
  }

  // getUsers
  getUsers = async (pagination:any) => {
    const _get = await APIClient.post(`${this.baseURI}/`, pagination)
    return _get.data;
  }

    // findAllUsers
    findAllUsers = async () => {
      const _get = await APIClient.get(`${this.baseURI}/`)
      return _get.data;
    }

  // findAUser
  findAUser = async (id: string) => {
    const _get = await APIClient.get(`${this.baseURI}/${id}`)
    return _get.data;
  }

  // deleteUser
  deleteUser = async (id: string) => {
    const _delete = await APIClient.delete(`${this.baseURI}/${id}`);
    return _delete;

  }

  // createUser
  createUser = async (user: User) => {
    const newUser = {
      firstname: user.firstname,
      lastname: user.lastname,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email
    }

    const _post = await APIClient.post(`${this.baseURI}/create`, newUser);
    return _post;
  }

  //updateUser
  updateUser = async (user: User) => {
    const updateUser = {
      firstname: user.firstname,
      lastname: user.lastname,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email
    }

    const _put = await APIClient.put(`${this.baseURI}/${user._id}`, updateUser)
    return _put;
  }

  // Static methods
  static init() {
    return new UserService("/api/user-model");
  }

  // getUsers
  static getUsers = async (pagination?:any) => {
    const _get = await UserService.init().getUsers(pagination);
    return _get;
  }

  // findAllUsers
  static findAllUsers = async () => {
    const _get = await UserService.init().findAllUsers();
    return _get;
  }

  // findAUser
  static findAUser = async (id: string) => {
    const _get = await UserService.init().findAUser(id);
    return _get;
  }

  // deleteUser
  static deleteUser = async (id: string) => {
    const _delete = await UserService.init().deleteUser(id);
    return _delete;

  }

  // createUser
  static createUser = async (user: User) => {
    const _post = await UserService.init().createUser(user);
    return _post;
  }

  //updateUser
  static updateUser = async (user: User) => {
    const _put = await UserService.init().updateUser(user);
    return _put;
  }
}