const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const User = require("../models/users");
const { handleResponse, handleError } = require("../utils/requestHandler");
const {
  generateToken,
  verifyToken,
} = require("../middlewares/generateAuthenticationToken");
const {
  generatePassword,
  comparePasswords,
} = require("../middlewares/generatePassword");

/** user signup api */

exports.signup = async (req, res) => {
  try {
    const body = req.body;
    /** check the existing user */
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return handleResponse({
        res,
        message: "User with this Credentials already exist",
      });
    }
    /** generate the hash passowrd */
    body.password = await generatePassword(body.password);
    const userResult = await User.create(body);
    return handleResponse({ res, message: "User Created", data: userResult });
  } catch (error) {
    return handleError({ res, error });
  }
};

/** user login api */

exports.signin = async (req, res) => {
  try {
    const body = req.body;

    // Check if the user with the given email exists
    const checkedUserData = await User.findOne({ email: body.email });
    if (!checkedUserData) {
      return handleResponse({
        res,
        message: "User not found",
      });
    }

    // Compare the provided password with the stored hashed password
    const comparePassword = await comparePasswords(
      body.password,
      checkedUserData.password
    );

    if (!comparePassword) {
      return handleResponse({
        res,
        message: "Password is incorrect",
      });
    }

    // Generate a token if the email and password are valid
    const tokenData = {
      id: checkedUserData._id,
      email: checkedUserData.email,
    };
    const token = generateToken(tokenData);

    // Set the token in a cookie with a 10-minute expiration

    console.log("Generated Token:", token);
    console.log("User Data Stored in Token:", tokenData);
    res.cookie("token", token, { maxAge: 10 * 60 * 1000, httpOnly: true });

    return handleResponse({
      res,
      token: token,
      message: "User Login Successfully",
    });
  } catch (error) {
    return handleError({ res, error });
  }
};

/** Update user Profile */

exports.updateUser = async (req, res) => {
  try {
    const body = req.body;
    const updatedData = await User.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    if (updatedData) {
      return handleResponse({
        res,
        message: "User Profile Successfully Updated",
      });
    }
    return handleResponse({
      res,
      message: "User with ID not found",
    });
  } catch (error) {
    console.log("error", error);
    return handleError({ res, error });
  }
};

/** Soft Delete User Profile */

exports.deleteUser = async (req, res) => {
  try {
    const updatedData = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false, isDeleted: true },
      { new: true }
    );
    if (updatedData) {
      return handleResponse({
        res,
        message: "User have Successfully Deleted",
      });
    }
    return handleResponse({
      res,
      message: "User with ID not found",
    });
  } catch (error) {
    return handleError({ res, error });
  }
};

exports.getDetailsById = async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);
    if (userData) {
      return handleResponse({
        res,
        message: "User Details",
        data: userData,
      });
    }
    return handleResponse({
      res,
      message: "User with ID not found",
    });
  } catch (error) {
    return handleError({ res, error });
  }
};