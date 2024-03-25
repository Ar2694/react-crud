import { Login } from "../../interfaces/LoginInterface";

const login = async (login: Login) => {

  const loginInfo = {
    username: login.username,
    password: login.password,

  }

  return await fetch(`http://localhost:3000/api/login-model/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo)
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


const findByUsername = async (username: string): Promise<any> => {

  const loginInfo = {
    username: username,
  }
  return await fetch("http://localhost:3000/api/login-model/find-username", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo)
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

const register = async (user: any) => {
  const newUser = {
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    password: user.password,

  }

  return await fetch(`http://localhost:3000/api/login-model/register`, {
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
const resetPassword = async (user: any) => {
  const userInfo = {
    username: user.username,
    password: user.password,

  }

  return await fetch(`http://localhost:3000/api/login-model/forgot-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo)
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
const LoginService = {
  login,
  register,
  resetPassword,
  findByUsername
};

export default LoginService;
