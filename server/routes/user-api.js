//require files to export
const express = require("express");
const User = require("../models/user-model.js");
const BaseResponse = require("../services/base-response.js");
const ErrorResponse = require("../services/error-response.js");
const userPipeline = require("../pipelines/user-pipeline.js");

//It defines router variables - configuration
const router = express.Router();

// Each API will go through this route -> http://localhost:3000/api/user-model

// ============================================================================================================================

/**
 * FindBySearch API
 */
router.get("/search/", async (req, res) => {
  try {
    const users = await User.find({});
    const findBySearchResponse = new BaseResponse(200, "Query Successful", users);

    return res.json(findBySearchResponse.toObject());
    
  } catch (e) {
    const findBySearchErrorResponse = new ErrorResponse(500, "Internal Server Error", e.message);
    return res.status(500).send(findBySearchErrorResponse.toObject());
  }
});

router.get("/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const pipeline = userPipeline(query);
    const users = await User.aggregate(pipeline);
    const findBySearchResponse = new BaseResponse(200, "Query Successful", users);

    return res.json(findBySearchResponse.toObject());

  } catch (e) {
    const findBySearchErrorResponse = new ErrorResponse(500, "Internal Server Error", e.message);
    return res.status(500).send(findBySearchErrorResponse.toObject());
  }
});

// ============================================================================================================================

/**
 * FindAll API
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    const findAllResponse = new BaseResponse(200, "Query Successful", users);

    return res.json(findAllResponse.toObject());

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
    const users = await User.findOne({ _id: req.params.id });
    const findByIdResponse = new BaseResponse(200, "Query Successful", users);

    return res.json(findByIdResponse.toObject());

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
    const user = await User.create(newUser);
    const createUserResponse = new BaseResponse(200, "Query Successful", user);

    return res.json(createUserResponse.toObject());

  } catch (err) {
    const createUserCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", err.message);
    return res.status(500).send(createUserCatchErrorResponse.toObject());
  }
});

// ============================================================================================================================

/**
 * UpdateUser API
 */
router.put("/:id", async (req, res) => {
  try {
    const updateUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      email: req.body.email,
    };

    const user = await User.updateOne({ _id: req.params.id }, updateUser);
    const updateUserResponse = new BaseResponse(200, "Query Successful", user);

    return res.json(updateUserResponse.toObject());

  } catch (e) {
    const UpdateUserCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", e.message);
    return res.status(500).send(UpdateUserCatchErrorResponse.toObject());
  }
});

// ============================================================================================================================

/**
 * DeleteUser API
 */
router.delete("/:id", async (req, res) => {
  try {
    //filtering criteria to identify a record within MongoDB
    const user = await User.findOne({ _id: req.params.id });
    const result = await user.deleteOne();
    const deleteUserResponse = new BaseResponse(200, "Query Successful", result);

    return res.json(deleteUserResponse.toObject());

  } catch (e) {
    const deleteUserCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", e.message);
    res.status(500).send(deleteUserCatchErrorResponse.toObject());
  }
});

module.exports = router;
