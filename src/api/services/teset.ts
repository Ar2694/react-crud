import { User } from "../../interfaces/UserInterface";

const findAllUsers = async (): Promise<User[]> => {
  return await fetch("http://localhost:3000/api/user-model/", {
    method: "GET",
    cache: 'no-store'
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    })
}

const findUser = async (id: String): Promise<User[]> => {
  return await fetch(`http://localhost:3000/api/user-model/${id}`, {
    method: "GET"
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    })
}


const deleteUser = async (id: String): Promise<User[]> => {
  return await fetch(`http://localhost:3000/api/user-model/${id}`, {
    method: "DELETE"
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    })
}

const createUser = async (user: User): Promise<User[]> => {
  const newUser = {
    firstname: user.firstname,
    lastname: user.lastname,
    phoneNumber: user.phoneNumber,
    address: user.address,
    email: user.email
  }

  return await fetch(`http://localhost:3000/api/user-model/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser)
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    })
}

const updateUser = async (user: User): Promise<User[]> => {
  const updateUser = {
    firstname: user.firstname,
    lastname: user.lastname,
    phoneNumber: user.phoneNumber,
    address: user.address,
    email: user.email
  }

  return await fetch(`http://localhost:3000/api/user-model/${user._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateUser)
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    })

}

const UserService = {
  findAllUsers,
  findUser,
  deleteUser,
  createUser,
  updateUser,
  
};

export default UserService;