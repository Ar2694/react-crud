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

/**
 * FindOne API
 * http://localhost:3000/api/login-model/login
 */
// router.post("/login", async (req, res) => {
//   try {
//     //filtering criteria to identify a record within MongoDB
//     await Login.findOne({ username: req.body.username })
//       .then((user) => {
//         // if...else function to determine what would happen if user is valid or invalid
//         if (user) {
//           const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
//           if (passwordIsValid) {
//             const jwtToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: 3600 });
//             const loginResponse = new BaseResponse(200, "Login Successful!", user, jwtToken);
//             return res.json(loginResponse.toObject());
//           } else {
//             const invalidPasswordResponse = new BaseResponse(401, "Invalid password. Please try again.", null);
//             return res.status(401).send(invalidPasswordResponse.toObject());
//           }
//         } else {
//           const invalidUsernameResponse = new BaseResponse(401, `Invalid username. Please try again.`, null);
//           return res.status(401).send(invalidUsernameResponse.toObject());
//         }
//       })

//       .catch((err) => {
//         const loginMongodbErrorResponse = new ErrorResponse(500, "MongoDB Error", err);
//         return res.status(500).send(loginMongodbErrorResponse.toObject());
//       });
//   } catch (e) {
//     const loginCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", e.message);
//     return res.status(500).send(loginCatchErrorResponse.toObject());
//   }
// });

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
    await Login.findOne({ username: req.body.username }).then((user) => {
      if (user) {
        const FindByUsernameResponse = new BaseResponse(200, "Query Successful", user);
        return res.json(FindByUsernameResponse.toObject());
      } else {
        const FindByUsernameMongodbCatchrResponse = new ErrorResponse(500, "Username does not exist!", null);
        return res.status(500).send(FindByUsernameMongodbCatchrResponse.toObject());
      }
    });
  } catch (e) {
    const FindByUsernameCatchErrorResponse = new ErrorResponse(500, "Internal Server Errorr", e.message);
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

    await Login.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          //if username exists, this error will show
          const userAlreadyExistsErrorResponse = new ErrorResponse("500", "Username is already taken.", user, true);
          return res.status(500).send(userAlreadyExistsErrorResponse.toObject());
        } else {
          // this will hash the password
          const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

          // this is going to be the login info
          const loginInfo = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: hashedPassword,
          };
          Login.create(loginInfo)
            .then((user) => {
              const registeredUserResponse = new BaseResponse("200", "Query Successful", user);
              return res.json(registeredUserResponse.toObject());
            })
            .catch((err) => {
              const newLoginMongodbErrorResponse = new ErrorResponse("500", "Internal Server Error test", err);
              return res.status(500).send(newLoginMongodbErrorResponse.toObject());
            });
        }
      })

      .catch((err) => {
        const registerMongodbErrorResponse = new ErrorResponse(500, "MongoDB Error", err);
        return res.status(500).send(registerMongodbErrorResponse.toObject());
      });
  } catch (e) {
    const registerCatchErrorResponse = new ErrorResponse("500", "Internal Server Error", e.message);
    return res.status(500).send(registerCatchErrorResponse.toObject());
  }
});

/**
 * ForgotPassword API
 * http://localhost:3000/api/login-model/forgot-password
 */
router.put("/forgot-password", async (req, res) => {
  try {
    //filtering criteria to identify a record within MongoDB
    await Login.findOne({ username: req.body.username }).then((user) => {
      if (user) {
        const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
        return user
          .set({
            password: hashedPassword,
          })
          .save();
      } else {
        const updateUserMongodbCatchrResponse = new ErrorResponse(500, "User does not exist!", null);
        return res.status(500).send(updateUserMongodbCatchrResponse.toObject());
      }
    });
  } catch (e) {
    const UpdateUserCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", e.message);
    return res.status(500).send(UpdateUserCatchErrorResponse.toObject());
  }
});

module.exports = router;
