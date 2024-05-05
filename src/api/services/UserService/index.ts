import { User } from "../../../interfaces/UserInterface";
import APIClient from "../../APIClient";


export default class UserService {

  static init() {
    return new UserService();
  }

  // getUsers
  getUsers = async () => {
    const _get = await APIClient.get("/api/user-model/")
    return _get.data;
  }

  // getUsers
  searchUsers = async (query: any) => {
    const _get = await APIClient.get(`/api/user-model/search/${query}`)
    return _get.data;
  }

  // findAUser
  findAUser = async (id: string) => {
    const get = await APIClient.get(`/api/user-model/${id}`)
    return get.data;
  }

  // deleteUser
  deleteUser = async (id: string) => {
    const _delete = await APIClient.delete(`/api/user-model/${id}`);
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

    const _post = await APIClient.post("/api/user-model/", newUser);
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

    const _put = await APIClient.put(`/api/user-model/${user._id}`, updateUser)
    return _put;
  }

}