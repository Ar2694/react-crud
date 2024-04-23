import { User } from "../../../interfaces/UserInterface";
import APIClient from "../../APIClient";


export default class UserService {

  // getUsers
  static getUsers = async () => {
    return APIClient.get("/api/user-model/")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      })
  }

  // findAUser
  static findAUser = async (id: string) => {
    return APIClient.get(`/api/user-model/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      })
  }

  // deleteUser
  static deleteUser = async (id: string) => {
    return APIClient.delete(`/api/user-model/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      })

  }

  // createUser
  static createUser = async (user: User) => {
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
  static updateUser = async (user: User) => {
    const updateUser = {
      firstname: user.firstname,
      lastname: user.lastname,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email
    }

    return APIClient.put(`/api/user-model/${user._id}`, updateUser)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      })
  }

}