const express = require("express");
const app = express();
const Router = express.Router();
const {
  AddItem,
  getTodoListByUserId,
  getTodoListItemByItemId,
  updateTodoListItemByItemId,
  deleteTodoListItemByItemId,
  statusUpdateItem,
} = require("../controller/todoController");
Router.route("/addItem").post(AddItem);
Router.route("/getTodoListByUserId/:id").get(getTodoListByUserId);
Router.route("/getTodoListItemByItemId/:id").get(getTodoListItemByItemId);
Router.route("/updateTodoListItemByItemId/:id").put(updateTodoListItemByItemId);
Router.route("/statusUpdateItem/:id").put(statusUpdateItem);
Router.route("/deleteItem/:id").delete(deleteTodoListItemByItemId);

module.exports = Router;
