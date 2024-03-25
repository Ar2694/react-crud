//require files to export
const express = require("express");
const User = require("../models/user-model.js");
const BaseResponse = require("../services/base-response.js");
const ErrorResponse = require("../services/error-response.js");

//It defines router variables - configuration
const router = express.Router();

// each API will go through this route -> http://localhost:3000/api/user-model

/**
 * FindAll API
 */
router.get("/", async (req, res) => {
  try {
    await User.find({})
      .where("isDisabled")
      .equals(false)
      .then((user) => {
        const findAllResponse = new BaseResponse(200, "Query Successful", user);
        return res.json(findAllResponse.toObject());
      })
      .catch((err) => {
        const findAllMongodbErrorResponse = new ErrorResponse(500, "Internal Server Error", err.message);
        return res.status(500).send(findAllMongodbErrorResponse.toObject());
      });
  } catch (err) {
    const findAllCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", err.message);
    return res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});

// ============================================================================================================================

/**
 * FindById API
 */
router.get("/:id", async (req, res) => {
  try {
    // Searches the database for the correct API
    await User.findOne({ _id: req.params.id })
      .then((user) => {
        const findByIdResponse = new BaseResponse(200, "Query Successful", user);
        return res.json(findByIdResponse.toObject());
      })
      .catch((err) => {
        const findByIdMongodbErrorResponse = new ErrorResponse(500, "Internal Server Error", err);
        return res.status(500).send(findByIdMongodbErrorResponse.toObject());
      });
  } catch (e) {
    const findByIdCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", e.message);
    res.status(500).send(findByIdCatchErrorResponse.toObject());
  }
});

// ============================================================================================================================
/**
 *  CreateUser API
 */
router.post("/", async (req, res) => {
  try {
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      email: req.body.email,
    };

    await User.create(newUser)
      .then((result) => {
        const createUserResponse = new BaseResponse(200, "Query Successful", result);
        return res.json(createUserResponse.toObject());
      })
      .catch((err) => {
        const createUserErrorResponse = new ErrorResponse(500, "Internal Server Error", err);
        return res.status(500).send(createUserErrorResponse.toObject());
      });
  } catch (err) {
    const createUserCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", err.message);
    return res.status(500).send(createUserCatchErrorResponse.toObject());
  }
});

/**
 * UpdateUser API
 */
router.put("/:id", async (req, res) => {
  try {
    //filtering criteria to identify a record within MongoDB
    await User.findOne({ _id: req.params.id })
      .then((user) => {
        return user
          .set({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
          })
          .save();
      })
      .then((user) => {
        const updateUserResponse = new BaseResponse(200, "Query Successful", user);
        return res.json(updateUserResponse.toObject());
      })
      .catch((err) => {
        const updateUserMongodbErrorResponse = new ErrorResponse(500, "Internal Server Error", err);
        return res.status(500).send(updateUserMongodbErrorResponse.toObject());
      });
  } catch (e) {
    const UpdateUserCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", e.message);
    return res.status(500).send(UpdateUserCatchErrorResponse.toObject());
  }
});

/**
 * DeleteUser API
 */
router.delete("/:id", async (req, res) => {
  try {
    //filtering criteria to identify a record within MongoDB
    await User.findOne({ _id: req.params.id })
      .then((user) => {
        User.deleteOne({ _id: user._id })
          .then((user) => {
            const DeleteUserResponse = new BaseResponse(200, "Query Successful", user);
            return res.json(DeleteUserResponse.toObject());
          })
          .catch((err) => {
            const DeleteUserDbErrorResponse = new ErrorResponse(500, "Internal Server Error", err);
            return res.status(500).send(DeleteUserDbErrorResponse.toObject());
          });
      })
      .catch((err) => {
        const findByIdMongodbErrorResponse = new ErrorResponse(500, "Internal Server Error", err);
        return res.status(500).send(findByIdMongodbErrorResponse.toObject());
      });
  } catch (e) {
    const DeleteUserCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", e.message);
    res.status(500).send(DeleteUserCatchErrorResponse.toObject());
  }
});


module.exports = router;
