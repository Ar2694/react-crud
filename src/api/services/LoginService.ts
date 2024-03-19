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
      console.log(response, "fetch")
      return response.json();
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err, "fetch catch")
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
      console.log(response, "register response")
      return response;
    })
    .catch((err) => {
      return err;
    })
}
const LoginService = {
  login,
  register
};

export default LoginService;
