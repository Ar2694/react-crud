import { Login } from "../../interfaces/LoginInterface";

const login = async (login: Login | any) => {

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

const LoginService = {
    login
  };
  
  export default LoginService;
  