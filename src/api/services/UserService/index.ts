import { User } from "../../../interfaces/UserInterface";
import APIClient from "../../APIClient";


export default class UserService {

  static init() {
    return new UserService();
  }

  // getUsers
  getUsers = async () => {
    const get = await APIClient.get("/api/user-model/")
    return get.data;
  }

  // getUsers
  searchUsers = async (query: any) => {
    const get = await APIClient.get(`/api/user-model/search/${query}`)
    return get.data;
  }

  // findAUser
  findAUser = async (id: string) => {
    const get = await APIClient.get(`/api/user-model/${id}`)
    return get.data;
  }

  // deleteUser
  deleteUser = async (id: string) => {
    return APIClient.delete(`/api/user-model/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      })

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

    return APIClient.post("/api/user-model/", newUser)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      })
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

    const put= await APIClient.put(`/api/user-model/${user._id}`, updateUser)
    console.log(put, "update user")
    return put;
  
  }

}