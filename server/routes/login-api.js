//require files to export
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BaseResponse = require("../services/base-response");
const ErrorResponse = require("../services/error-response");
const Login = require("../models/login-model");

//It defines router variables - configuration
const router = express.Router();
const saltRounds = 10; //default salt rounds for hashing algorithm

// each API will go through this route -> http://localhost:3000/api/login-model

router.post("/login", async (req, res) => {
  try {
    const user = await Login.findOne({ username: req.body.username });

    if (user) {
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (passwordIsValid) {

        const jwtToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: 3600 });
        const loginResponse = new BaseResponse(200, "Login Successful!", user, jwtToken);

        return res.json(loginResponse.toObject());

      } else {

        const invalidPasswordResponse = new BaseResponse(401, "Invalid password. Please try again.", null);
        return res.status(401).send(invalidPasswordResponse.toObject());

      }

    } else {

      const invalidUsernameResponse = new BaseResponse(401, `Invalid username. Please try again.`, null);
      return res.status(401).send(invalidUsernameResponse.toObject());

    }
  } catch (e) {

    const loginCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", e.message);
    return res.status(500).send(loginCatchErrorResponse.toObject());

  }
});

/**
 * FindByUsername API
 * http://localhost:3000/api/login-model/find-username
 */
router.post("/find-username", async (req, res) => {
  try {

    const user = await Login.findOne({ username: req.body.username });

    if (user) {

      const FindByUsernameResponse = new BaseResponse(200, "Query Successful", user);
      return res.json(FindByUsernameResponse.toObject());

    } else {

      const FindByUsernameMongodbCatchrResponse = new ErrorResponse(404, "Username does not exist!", null, true);
      return res.status(404).send(FindByUsernameMongodbCatchrResponse.toObject());

    }

  } catch (e) {

    const FindByUsernameCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", e.message);
    return res.status(500).send(FindByUsernameCatchErrorResponse.toObject());
  }
});

/**
 * FindOne API
 * http://localhost:3000/api/login-model/register
 */
router.post("/register", async (req, res) => {
  try {
    //filtering criteria to identify a record within MongoDB
    const user = await Login.findOne({ username: req.body.username });

    if (user) {
      //if username exists, this error will show
      const userAlreadyExistsErrorResponse = new ErrorResponse(302, "Username is already taken.", user, true);
      return res.status(302).send(userAlreadyExistsErrorResponse.toObject());
    } else {
      // this will hash the password
      const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

      // this is going to be the login info
      const loginInfo = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: hashedPassword,
      }
   
      const createUser = await Login.create(loginInfo);

      if (createUser) {
        const registeredUserResponse = new BaseResponse(200, "Query Successful", user);
        return res.json(registeredUserResponse.toObject());

      } else {
        const newLoginMongodbErrorResponse = new ErrorResponse(500, "Internal Server Error test", err);
        return res.status(500).send(newLoginMongodbErrorResponse.toObject());

      }

    }
  } catch (e) {
    const registerCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", e.message);
    return res.status(500).send(registerCatchErrorResponse.toObject());
  }
});

/**
 * ForgotPassword API
 * http://localhost:3000/api/login-model/forgot-password
 */
router.put("/forgot-password", async (req, res) => {
  try {
    const user = await Login.findOne({ username: req.body.username });

    if (user) {

      const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
      user.set({ password: hashedPassword }).save();

      const forgotPasswordResponse = new BaseResponse(200, "Query Successful", {});
      return res.json(forgotPasswordResponse.toObject());

    } else {

      const forgotPasswordErrorResponse = new ErrorResponse(404, "Username does not exist!", null, true);
      return res.status(404).send(forgotPasswordErrorResponse.toObject());

    }

  } catch (e) {
    const UpdateUserCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", e.message);
    return res.status(500).send(UpdateUserCatchErrorResponse.toObject());
  }
});

module.exports = router;
