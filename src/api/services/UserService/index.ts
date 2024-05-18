import { User } from "interfaces/UserInterface";
import APIClient from "api/APIClient";


export default class UserService {
  private baseURI: string;

  constructor(baseURI: string) {
    this.baseURI = baseURI;
  }

  static init() {
    return new UserService("/api/user-model");
  }

  // getUsers
  getUsers = async () => {
    const _get = await APIClient.get(`${this.baseURI}/`)
    return _get.data;
  }

  // getUsers
  searchUsers = async (query: any) => {
    const _get = await APIClient.get(`${this.baseURI}/search/${query}`)
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

    const _post = await APIClient.post(`${this.baseURI}/`, newUser);
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

}