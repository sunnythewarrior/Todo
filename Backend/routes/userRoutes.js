const express = require("express");
const app = express();
const Router = express.Router();
const {
  signup,
  signin,
  updateUser,
  deleteUser,
  getDetailsById,
  verifyUser,
  updatePassword,
} = require("../controller/userController");
Router.route("/signup").post(signup);
Router.route("/signin").post(signin);
Router.route("/getUserDetails/:id").get(getDetailsById);
Router.route("/updateUser/:id").put(updateUser);
Router.route("/deleteUser/:id").delete(deleteUser);
Router.route("/verifyToken").post(verifyUser);
Router.route("/forgotpassword").put(updatePassword);
module.exports = Router;
